import {CellOrUndefined, Changes, Store, ValueOrUndefined} from './types/store';
import {EMPTY_STRING, strEndsWith, strStartsWith} from './common/strings';
import {
  Hash,
  MergeableChanges,
  MergeableContent,
  MergeableStore,
  Stamp,
  Time,
  createMergeableStore as createMergeableStoreDecl,
} from './types/mergeable-store';
import {
  HashStamp,
  cloneHashStampToStamp,
  hashIdAndHash,
  hashStampMapToStampObj,
  hashStampNewMap,
  hashStampNewThing,
  hashStampToStamp,
  stampNew,
  stampNewObj,
  updateHashStamp,
} from './mergeable-store/stamps';
import {IdMap, mapEnsure, mapGet} from './common/map';
import {
  IdObj,
  objEnsure,
  objForEach,
  objFreeze,
  objIsEmpty,
  objNew,
  objToArray,
} from './common/obj';
import {isUndefined, slice} from './common/other';
import {Id} from './types/common';
import {createStore} from './store';
import {getHash} from './mergeable-store/hash';
import {getHlcFunctions} from './mergeable-store/hlc';
import {jsonString} from './common/json';

const LISTENER_ARGS: IdObj<number> = {
  HasTable: 1,
  Table: 1,
  TableCellIds: 1,
  HasTableCell: 2,
  RowCount: 1,
  RowIds: 1,
  SortedRowIds: 5,
  HasRow: 2,
  Row: 2,
  CellIds: 2,
  HasCell: 3,
  Cell: 3,
  HasValue: 1,
  Value: 1,
  InvalidCell: 3,
  InvalidValue: 1,
};

type TableHashStamp = HashStamp<IdMap<RowHashStamp>>;
type RowHashStamp = HashStamp<IdMap<HashStamp<CellOrUndefined>>>;
type ContentHashStamp = HashStamp<
  [
    tablesStamp: HashStamp<IdMap<TableHashStamp>>,
    valuesStamp: HashStamp<IdMap<HashStamp<ValueOrUndefined>>>,
  ]
>;

const newContentHashStamp = (time = EMPTY_STRING): ContentHashStamp => [
  0,
  time,
  [hashStampNewMap(time), hashStampNewMap(time)],
];

export const createMergeableStore = ((id: Id): MergeableStore => {
  let listening = 1;
  let contentHashStamp = newContentHashStamp();
  let transactionTime: Time | undefined;
  let transactionContentStamp: MergeableChanges | undefined;
  const [getHlc, seenHlc] = getHlcFunctions(id);
  const store = createStore();

  const disableListening = (actions: () => void) => {
    const wasListening = listening;
    listening = 0;
    actions();
    listening = wasListening;
  };

  const mergeContent = (contentStamp: MergeableChanges): Changes => {
    const tablesChanges = {};
    const valuesChanges = {};

    const [, [[tablesTime, tableStamps], valuesStamp]] = contentStamp;
    const [, , [tablesHashStamp, valuesHashStamp]] = contentHashStamp;
    const [oldTablesHash, oldTablesTime, tableHashStamps] = tablesHashStamp;

    if (tablesTime) {
      let tablesHash =
        oldTablesHash ^
        (tablesTime > oldTablesTime
          ? (oldTablesTime ? getHash(oldTablesTime) : 0) ^ getHash(tablesTime)
          : 0);

      objForEach(tableStamps, ([tableTime, rowStamps], tableId) => {
        const tableHashStamp = mapEnsure<Id, TableHashStamp>(
          tableHashStamps,
          tableId,
          hashStampNewMap,
        );
        const [oldTableHash, oldTableTime, rowHashStamps] = tableHashStamp;
        let tableHash =
          oldTableHash ^
          (tableTime > oldTableTime
            ? (oldTableTime ? getHash(oldTableTime) : 0) ^ getHash(tableTime)
            : 0);

        objForEach(rowStamps, (rowStamp, rowId) => {
          const [oldRowHash, rowHash] = mergeCellsOrValues(
            rowStamp,
            mapEnsure<Id, RowHashStamp>(rowHashStamps, rowId, hashStampNewMap),
            objEnsure<IdObj<CellOrUndefined>>(
              objEnsure<IdObj<IdObj<CellOrUndefined>>>(
                tablesChanges,
                tableId,
                objNew,
              ),
              rowId,
              objNew,
            ),
          );
          tableHash ^=
            (oldRowHash ? hashIdAndHash(rowId, oldRowHash) : 0) ^
            hashIdAndHash(rowId, rowHash);
        });
        updateHashStamp(tableHashStamp, tableHash, tableTime);
        tablesHash ^=
          (oldTableHash ? hashIdAndHash(tableId, oldTableHash) : 0) ^
          hashIdAndHash(tableId, tableHashStamp[0]);
      });
      updateHashStamp(tablesHashStamp, tablesHash, tablesTime);
    }

    mergeCellsOrValues(valuesStamp, valuesHashStamp, valuesChanges);

    updateHashStamp(
      contentHashStamp,
      tablesHashStamp[0] ^ valuesHashStamp[0],
      contentStamp[0],
    );

    return [tablesChanges, valuesChanges];
  };

  const mergeCellsOrValues = <Thing extends CellOrUndefined | ValueOrUndefined>(
    thingsStamp: Stamp<IdObj<Stamp<Thing>>>,
    thingsHashStamp: HashStamp<IdMap<HashStamp<Thing>>>,
    thingsChanges: {[thingId: Id]: Thing},
  ): [oldThingsHash: number, newThingsHash: number] => {
    const [thingsTime, thingStamps] = thingsStamp;
    const [oldThingsHash, oldThingsTime, thingHashStamps] = thingsHashStamp;
    if (thingsTime) {
      let thingsHash =
        oldThingsHash ^
        (thingsTime > oldThingsTime
          ? (oldThingsTime ? getHash(oldThingsTime) : 0) ^ getHash(thingsTime)
          : 0);

      objForEach(thingStamps, ([thingTime, thing], thingId) => {
        const thingHashStamp = mapEnsure<Id, HashStamp<Thing>>(
          thingHashStamps,
          thingId,
          hashStampNewThing,
        );
        const [oldThingHash, oldThingTime] = thingHashStamp;

        if (thingTime > oldThingTime) {
          updateHashStamp(
            thingHashStamp,
            getHash(jsonString(thing ?? null) + ':' + thingTime),
            thingTime,
          );
          thingHashStamp[2] = thing;
          thingsChanges[thingId] = thing;
          thingsHash ^=
            hashIdAndHash(thingId, oldThingHash) ^
            hashIdAndHash(thingId, thingHashStamp[0]);
        }
      });

      updateHashStamp(thingsHashStamp, thingsHash, thingsTime);
    }
    return [oldThingsHash, thingsHashStamp[0]];
  };

  const preFinishTransaction = () => {
    if (listening) {
      transactionContentStamp = getTransactionMergeableChanges();
      mergeContent(transactionContentStamp);
    }
  };

  const postFinishTransaction = () =>
    (transactionTime = transactionContentStamp = undefined);

  const getMergeableContent = (): MergeableContent =>
    hashStampToStamp(contentHashStamp, ([tablesStamp, valuesStamp]) => [
      hashStampMapToStampObj(tablesStamp, (rowsStamp) =>
        hashStampMapToStampObj(rowsStamp, (cellsStamp) =>
          hashStampMapToStampObj(cellsStamp, cloneHashStampToStamp),
        ),
      ),
      hashStampMapToStampObj(valuesStamp, cloneHashStampToStamp),
    ]);

  const setMergeableContent = (mergeableContent: MergeableContent) => {
    disableListening(() =>
      store.transaction(() => {
        store.delTables().delValues();
        contentHashStamp = newContentHashStamp();
      }),
    );
    applyMergeableChanges(mergeableContent);
    return mergeableStore;
  };

  const getTransactionMergeableChanges = (): MergeableChanges => {
    if (isUndefined(transactionContentStamp)) {
      const [, , changedCells, , changedValues] = store.getTransactionLog();
      const time =
        !objIsEmpty(changedCells) || !objIsEmpty(changedValues)
          ? transactionTime ?? (transactionTime = getHlc())
          : EMPTY_STRING;
      const mergeableChanges: MergeableChanges = stampNew(time, [
        stampNewObj(objIsEmpty(changedCells) ? EMPTY_STRING : time),
        stampNewObj(objIsEmpty(changedValues) ? EMPTY_STRING : time),
      ]);
      const [[, tableStamps], [, valuesStamp]] = mergeableChanges[1];

      objToArray(changedCells, (changedTable, tableId) => {
        const [, rowStamps] = (tableStamps[tableId] = stampNewObj(time));
        objToArray(changedTable, (changedRow, rowId) => {
          const [, cellStamps] = (rowStamps[rowId] = stampNewObj(time));
          objToArray(
            changedRow,
            ([, newCell], cellId) =>
              (cellStamps[cellId] = stampNew(time, newCell)),
          );
        });
      });
      objToArray(
        changedValues,
        ([, newValue], valueId) =>
          (valuesStamp[valueId] = stampNew(time, newValue)),
      );

      return mergeableChanges;
    }
    return transactionContentStamp;
  };

  const applyMergeableChanges = (
    mergeableChanges: MergeableChanges,
  ): MergeableStore => {
    seenHlc(mergeableChanges[0]);
    disableListening(() => store.applyChanges(mergeContent(mergeableChanges)));
    return mergeableStore as MergeableStore;
  };

  const merge = (mergeableStore2: MergeableStore) => {
    const mergeableContent = mergeableStore.getMergeableContent();
    const mergeableContent2 = mergeableStore2.getMergeableContent();
    mergeableStore2.applyMergeableChanges(mergeableContent);
    return applyMergeableChanges(mergeableContent2);
  };

  const getContentHash = (): Hash => contentHashStamp[0];

  const getTablesHash = (): Hash => contentHashStamp[2][0][0];

  const getTableHash = (tableId: Id): Hash =>
    mapGet(contentHashStamp[2][0][2], tableId)?.[0] ?? 0;

  const getRowHash = (tableId: Id, rowId: Id): Hash =>
    mapGet(mapGet(contentHashStamp[2][0][2], tableId)?.[2], rowId)?.[0] ?? 0;

  const getCellHash = (tableId: Id, rowId: Id, cellId: Id): Hash =>
    mapGet(
      mapGet(mapGet(contentHashStamp[2][0][2], tableId)?.[2], rowId)?.[2],
      cellId,
    )?.[0] ?? 0;

  const getValuesHash = (): Hash => contentHashStamp[2][1][0];

  const getValueHash = (valueId: Id): Hash =>
    mapGet(contentHashStamp[2][1][2], valueId)?.[0] ?? 0;

  const mergeableStore: IdObj<any> = {
    getMergeableContent,
    setMergeableContent,
    getTransactionMergeableChanges,
    applyMergeableChanges,
    merge,
    getContentHash,
    getTablesHash,
    getTableHash,
    getRowHash,
    getCellHash,
    getValuesHash,
    getValueHash,
  };

  (store as any).setInternalListeners(
    preFinishTransaction,
    postFinishTransaction,
  );

  objToArray(
    store as IdObj<any>,
    (method, name) =>
      (mergeableStore[name] =
        // fluent methods
        strStartsWith(name, 'set') ||
        strStartsWith(name, 'del') ||
        strStartsWith(name, 'apply') ||
        strEndsWith(name, 'Transaction') ||
        name == 'callListener'
          ? (...args: any[]) => {
              method(...args);
              return mergeableStore;
            }
          : strStartsWith(name, 'add') && strEndsWith(name, 'Listener')
            ? (...args: any[]) => {
                const listenerArg = LISTENER_ARGS[slice(name, 3, -8)] ?? 0;
                const listener = args[listenerArg];
                args[listenerArg] = (_store: Store, ...args: any[]) =>
                  listener(mergeableStore, ...args);
                return method(...args);
              }
            : method),
  );
  return objFreeze(mergeableStore) as MergeableStore;
}) as typeof createMergeableStoreDecl;
