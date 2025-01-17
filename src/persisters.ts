import {DEBUG, ifNotUndefined, isUndefined} from './common/other';
import {GetTransactionChanges, Store, Tables, Values} from './types/store.d';
import {
  Persister,
  PersisterListener,
  PersisterStats,
} from './types/persisters.d';
import {arrayPush, arrayShift} from './common/array';
import {mapEnsure, mapGet, mapNew, mapSet} from './common/map';
import {objFreeze, objIsEmpty} from './common/obj';
import {Id} from './types/common.d';

type Action = () => Promise<any>;

const scheduleRunning: Map<any, 0 | 1> = mapNew();
const scheduleActions: Map<any, Action[]> = mapNew();

export const createCustomPersister = <ListeningHandle>(
  store: Store,
  getPersisted: () => Promise<[Tables, Values] | undefined>,
  setPersisted: (
    getContent: () => [Tables, Values],
    getTransactionChanges?: GetTransactionChanges,
  ) => Promise<void>,
  addPersisterListener: (listener: PersisterListener) => ListeningHandle,
  delPersisterListener: (listeningHandle: ListeningHandle) => void,
  onIgnoredError?: (error: any) => void,
  scheduleId = [],
): Persister => {
  let listenerId: Id | undefined;
  let loadSave = 0;
  let loads = 0;
  let saves = 0;
  let listening = 0;
  let action;
  let listeningHandle: ListeningHandle | undefined;

  mapEnsure(scheduleRunning, scheduleId, () => 0);
  mapEnsure(scheduleActions, scheduleId, () => []);

  const run = async (): Promise<void> => {
    /*! istanbul ignore else */
    if (!mapGet(scheduleRunning, scheduleId)) {
      mapSet(scheduleRunning, scheduleId, 1);
      while (
        !isUndefined(
          (action = arrayShift(
            mapGet(scheduleActions, scheduleId) as Action[],
          )),
        )
      ) {
        try {
          await action();
        } catch (error) {
          /*! istanbul ignore next */
          onIgnoredError?.(error);
        }
      }
      mapSet(scheduleRunning, scheduleId, 0);
    }
  };

  const loadLock = async (actions: Action): Promise<Persister> => {
    /*! istanbul ignore else */
    if (loadSave != 2) {
      loadSave = 1;
      if (DEBUG) {
        loads++;
      }
      await persister.schedule(async () => {
        await actions();
        loadSave = 0;
      });
    }
    return persister;
  };

  const persister: any = {
    load: async (
      initialTables?: Tables,
      initialValues?: Values,
    ): Promise<Persister> =>
      await loadLock(async () => {
        try {
          store.setContent((await getPersisted()) as [Tables, Values]);
        } catch {
          store.setContent([initialTables, initialValues] as [Tables, Values]);
        }
      }),

    startAutoLoad: async (
      initialTables: Tables = {},
      initialValues: Values = {},
    ): Promise<Persister> => {
      persister.stopAutoLoad();
      await persister.load(initialTables, initialValues);
      listening = 1;
      listeningHandle = addPersisterListener(
        async (getContent, getTransactionChanges) => {
          if (getTransactionChanges) {
            const transactionChanges = getTransactionChanges();
            await loadLock(async () =>
              store.setTransactionChanges(transactionChanges),
            );
          } else {
            await loadLock(async () => {
              try {
                store.setContent(
                  getContent?.() ??
                    ((await getPersisted()) as [Tables, Values]),
                );
              } catch (error) {
                onIgnoredError?.(error);
              }
            });
          }
        },
      );
      return persister;
    },

    stopAutoLoad: (): Persister => {
      if (listening) {
        delPersisterListener(listeningHandle as ListeningHandle);
        listeningHandle = undefined;
        listening = 0;
      }
      return persister;
    },

    save: async (
      getTransactionChanges?: GetTransactionChanges,
    ): Promise<Persister> => {
      /*! istanbul ignore else */
      if (loadSave != 1) {
        loadSave = 2;
        if (DEBUG) {
          saves++;
        }
        await persister.schedule(async () => {
          try {
            await setPersisted(store.getContent, getTransactionChanges);
          } catch (error) {
            /*! istanbul ignore next */
            onIgnoredError?.(error);
          }
          loadSave = 0;
        });
      }
      return persister;
    },

    startAutoSave: async (): Promise<Persister> => {
      await persister.stopAutoSave().save();
      listenerId = store.addDidFinishTransactionListener(
        (_store, getTransactionChanges) => {
          const [tableChanges, valueChanges] = getTransactionChanges();
          if (!objIsEmpty(tableChanges) || !objIsEmpty(valueChanges)) {
            (persister.save as any)(() => [tableChanges, valueChanges]);
          }
        },
      );
      return persister;
    },

    stopAutoSave: (): Persister => {
      ifNotUndefined(listenerId, store.delListener);
      return persister;
    },

    schedule: async (...actions: Action[]): Promise<Persister> => {
      arrayPush(mapGet(scheduleActions, scheduleId) as Action[], ...actions);
      await run();
      return persister;
    },

    getStore: (): Store => store,

    destroy: (): Persister => persister.stopAutoLoad().stopAutoSave(),

    getStats: (): PersisterStats => (DEBUG ? {loads, saves} : {}),
  };

  return objFreeze(persister as Persister);
};
