import {Cmd, getCommandFunctions} from './commands.ts';
import type {
  PersistedContent,
  PersistedStore,
  Persister,
  PersisterListener,
  Persists,
} from '../../../@types/persisters/index.d.ts';
import {
  jsonParseWithUndefined,
  jsonStringWithUndefined,
} from '../../../common/json.ts';
import {DefaultedJsonConfig} from './config.ts';
import {SINGLE_ROW_ID} from './common.ts';
import {createCustomPersister} from '../../index.ts';

export const createJsonPgPersister = <
  ListeningHandle,
  Persist extends Persists = Persists.StoreOnly,
>(
  store: PersistedStore<Persist>,
  cmd: Cmd,
  addPersisterListener: (
    listener: PersisterListener<Persist>,
  ) => Promise<ListeningHandle>,
  delPersisterListener: (listeningHandle: ListeningHandle) => void,
  onIgnoredError: ((error: any) => void) | undefined,
  destroyImpl: () => void,
  persist: Persist,
  [storeTableName, storeIdColumnName, storeColumnName]: DefaultedJsonConfig,
  managedTableNames: string[],
  thing: any,
  getThing: string,
): Persister<Persist> => {
  const [refreshSchema, loadTable, saveTable, transaction] =
    getCommandFunctions(cmd, managedTableNames, onIgnoredError);

  const getPersisted = async (): Promise<PersistedContent<Persist>> =>
    await transaction(async () => {
      await refreshSchema();
      return jsonParseWithUndefined(
        ((await loadTable(storeTableName, storeIdColumnName))[SINGLE_ROW_ID]?.[
          storeColumnName
        ] as string) ?? 'null',
      );
    });

  const setPersisted = async (
    getContent: () => PersistedContent<Persist>,
  ): Promise<void> =>
    await transaction(async () => {
      await refreshSchema();
      await saveTable(
        storeTableName,
        storeIdColumnName,
        {
          [SINGLE_ROW_ID]: {
            [storeColumnName]: jsonStringWithUndefined(getContent() ?? null),
          },
        },
        true,
        true,
      );
    });

  const destroy = () => {
    persister.stopAutoLoad().stopAutoSave();
    destroyImpl();
    return persister;
  };

  const persister: any = createCustomPersister(
    store,
    getPersisted,
    setPersisted,
    addPersisterListener,
    delPersisterListener,
    onIgnoredError,
    persist,
    {[getThing]: () => thing, destroy},
    thing,
  );

  return persister;
};