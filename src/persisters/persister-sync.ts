import {
  Bus,
  BusStats,
  Receive,
  Send,
  SyncPersister,
  createLocalBus as createLocalBusDecl,
  createSyncPersister as createSyncPersisterDecl,
} from '../types/persisters/persister-sync';
import {
  ContentHashes,
  MergeableChanges,
  MergeableStore,
  RowIdsDiff,
  TableIdsDiff,
  TablesStamp,
  ValuesStamp,
} from '../types/mergeable-store';
import {DEBUG, ifNotUndefined, isUndefined, promiseNew} from '../common/other';
import {Id, IdOrNull} from '../types/common';
import {IdMap, mapGet, mapNew, mapSet} from '../common/map';
import {collDel, collForEach, collSize} from '../common/coll';
import {EMPTY_STRING} from '../common/strings';
import {PersisterListener} from '../types/persisters';
import {createCustomPersister} from '../persisters';
import {getHlcFunctions} from '../mergeable-store/hlc';

const CONTENT_HASHES = 'contentHashes';
const GET_CONTENT_HASHES = 'getContentHashes';
const GET_TABLE_IDS_DIFF = 'getTableIdsDiff';
const GET_ROW_IDS_DIFF = 'getRowIdsDiff';
const GET_TABLES_CHANGES = 'getTablesChanges';
const GET_VALUES_CHANGES = 'getValuesChanges';

export const createSyncPersister = ((
  store: MergeableStore,
  bus: Bus,
  requestTimeoutSeconds = 1,
  onIgnoredError?: (error: any) => void,
): SyncPersister => {
  let persisterListener: PersisterListener | undefined;

  const [join] = bus;
  const [getHlc] = getHlcFunctions(store.getId());
  const pendingRequests: IdMap<
    [
      toStoreId: IdOrNull,
      handlePayload: (payload: any, fromStoreId: Id) => void,
    ]
  > = mapNew();

  const receive = (
    requestId: IdOrNull,
    fromStoreId: Id,
    message: string,
    ...parts: any[]
  ) => {
    if (message == EMPTY_STRING) {
      ifNotUndefined(
        mapGet(pendingRequests, requestId),
        ([toStoreId, handlePayload]) =>
          message == EMPTY_STRING &&
          (isUndefined(toStoreId) || toStoreId == fromStoreId)
            ? handlePayload(parts[0], fromStoreId)
            : 0,
      );
    } else if (message == CONTENT_HASHES) {
      persister.isAutoLoading()
        ? getChangesFromOtherStore(fromStoreId, parts[0]).then((changes: any) =>
            persisterListener?.(undefined, () => changes),
          )
        : 0;
    } else {
      const responsePayload =
        message == GET_CONTENT_HASHES && persister.isAutoSaving()
          ? store.getMergeableContentHashes()
          : message == GET_TABLE_IDS_DIFF
            ? store.getMergeableTableIdsDiff(parts[0])
            : message == GET_ROW_IDS_DIFF
              ? store.getMergeableRowIdsDiff(parts[0])
              : message == GET_TABLES_CHANGES
                ? store.getMergeableTablesChanges(parts[0])
                : message == GET_VALUES_CHANGES
                  ? store.getMergeableValuesChanges(parts[0])
                  : 0;
      responsePayload === 0
        ? 0
        : send(requestId, fromStoreId, EMPTY_STRING, responsePayload);
    }
  };

  const [send] = join(store.getId(), receive);

  const request = async <Payload>(
    toStoreId: IdOrNull,
    message: string,
    ...parts: any[]
  ): Promise<[payload: Payload, fromStoreId: Id]> =>
    promiseNew((resolve, reject) => {
      const requestId = getHlc();
      const timeout = setTimeout(() => {
        collDel(pendingRequests, requestId);
        reject(`No response from ${toStoreId ?? 'anyone'} to '${message}'`);
      }, requestTimeoutSeconds * 1000);
      mapSet(pendingRequests, requestId, [
        toStoreId,
        (payload: any, fromStoreId: Id) => {
          clearTimeout(timeout);
          collDel(pendingRequests, requestId);
          resolve([payload, fromStoreId]);
        },
      ]);
      send(requestId, toStoreId, message, ...parts);
    });

  const getChangesFromOtherStore = async (
    otherStoreId: IdOrNull = null,
    otherContentHashes?: ContentHashes,
  ): Promise<MergeableChanges> => {
    if (isUndefined(otherContentHashes)) {
      [otherContentHashes, otherStoreId] = await request<ContentHashes>(
        otherStoreId,
        GET_CONTENT_HASHES,
      );
    }
    const [otherContentTime, [otherTablesHash, otherValuesHash]] =
      otherContentHashes;
    const [, [tablesHash, valuesHash]] = store.getMergeableContentHashes();

    const changes: MergeableChanges = ['', [['', {}], ['', {}], 1]];

    if (tablesHash != otherTablesHash) {
      changes[0] = otherContentTime;
      changes[1][0] = (
        await request<TablesStamp>(
          otherStoreId,
          GET_TABLES_CHANGES,
          store.getMergeableCellHashes(
            (
              await request<RowIdsDiff>(
                otherStoreId,
                GET_ROW_IDS_DIFF,
                store.getMergeableRowHashes(
                  (
                    await request<TableIdsDiff>(
                      otherStoreId,
                      GET_TABLE_IDS_DIFF,
                      store.getMergeableTableHashes(),
                    )
                  )[0],
                ),
              )
            )[0],
          ),
        )
      )[0];
    }

    if (valuesHash != otherValuesHash) {
      changes[0] = otherContentTime;
      changes[1][1] = (
        await request<ValuesStamp>(
          otherStoreId,
          GET_VALUES_CHANGES,
          store.getMergeableValuesHashes(),
        )
      )[0];
    }

    return changes;
  };

  const getPersisted = async (): Promise<any> => {
    const changes = await getChangesFromOtherStore();
    return changes[0] != EMPTY_STRING ? changes : undefined;
  };

  const setPersisted = async (): Promise<void> => {
    send(null, null, CONTENT_HASHES, store.getMergeableContentHashes());
  };

  const addPersisterListener = (listener: PersisterListener) =>
    (persisterListener = listener);

  const delPersisterListener = () => (persisterListener = undefined);

  const persister = createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    true,
    {
      getBus: () => bus,
      startSync: async () =>
        await (await persister.startAutoLoad()).startAutoSave(),
      stopSync: () => persister.destroy,
    },
  ) as SyncPersister;
  return persister;
}) as typeof createSyncPersisterDecl;

export const createLocalBus = (() => {
  let sends = 0;
  let receives = 0;
  const stores: IdMap<Receive> = mapNew();
  return [
    (storeId: Id, receive: Receive): [Send, () => void] => {
      mapSet(stores, storeId, receive);
      const send = (
        requestId: IdOrNull,
        toStoreId: IdOrNull,
        message: string,
        ...parts: any[]
      ): void => {
        if (DEBUG) {
          sends++;
          receives += isUndefined(toStoreId) ? collSize(stores) - 1 : 1;
        }
        isUndefined(toStoreId)
          ? collForEach(stores, (receive, otherStoreId) =>
              otherStoreId != storeId
                ? receive(requestId, storeId, message, ...parts)
                : 0,
            )
          : mapGet(stores, toStoreId)?.(requestId, storeId, message, ...parts);
      };
      const leave = (): void => {
        collDel(stores, storeId);
      };
      return [send, leave];
    },
    (): BusStats => (DEBUG ? {sends, receives} : {}),
  ];
}) as typeof createLocalBusDecl;
