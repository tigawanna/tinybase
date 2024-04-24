/// persisters

import {
  Changes,
  Content,
  OptionalSchemas,
  OptionalTablesSchema,
  Store,
} from './store.d';
import {
  MergeableChanges,
  MergeableContent,
  MergeableStore,
} from './mergeable-store.d';
import {TableIdFromSchema} from './internal/store.d';

/// PersistedStore
export type PersistedStore<
  Schemas extends OptionalSchemas,
  SupportsMergeableStore extends boolean = false,
> =
  | Store<Schemas>
  | (SupportsMergeableStore extends true ? MergeableStore<Schemas> : never);

/// PersistedContent
export type PersistedContent<
  Schemas extends OptionalSchemas,
  SupportsMergeableStore extends boolean = false,
> =
  | Content<Schemas>
  | (SupportsMergeableStore extends true ? MergeableContent<Schemas> : never);

/// PersistedChanges
export type PersistedChanges<
  Schemas extends OptionalSchemas,
  SupportsMergeableStore extends boolean = false,
> =
  | Changes<Schemas>
  | (SupportsMergeableStore extends true ? MergeableChanges<Schemas> : never);

/// PersisterListener
export type PersisterListener<
  Schemas extends OptionalSchemas,
  SupportsMergeableStore extends boolean = false,
> = (
  content?: PersistedContent<Schemas, SupportsMergeableStore>,
  changes?: PersistedChanges<Schemas, SupportsMergeableStore>,
) => void;

/// PersisterStats
export type PersisterStats = {
  /// PersisterStats.loads
  loads?: number;
  /// PersisterStats.saves
  saves?: number;
};

/// DatabasePersisterConfig
export type DatabasePersisterConfig<Schemas extends OptionalSchemas> =
  | DpcJson
  | DpcTabular<Schemas[0]>;

/// DpcJson
export type DpcJson = {
  /// DpcJson.mode
  mode: 'json';
  /// DpcJson.storeTableName
  storeTableName?: string;
  /// DatabasePersisterConfig.autoLoadIntervalSeconds
  autoLoadIntervalSeconds?: number;
};

/// DpcTabular
export type DpcTabular<Schema extends OptionalTablesSchema> = {
  /// DpcTabular.mode
  mode: 'tabular';
  /// DpcTabular.tables
  tables?: {
    /// DpcTabular.tables.load
    load?: DpcTabularLoad<Schema>;
    /// DpcTabular.tables.save
    save?: DpcTabularSave<Schema>;
  };
  /// DpcTabular.values
  values?: DpcTabularValues;
  /// DatabasePersisterConfig.autoLoadIntervalSeconds
  autoLoadIntervalSeconds?: number;
};

/// DpcTabularLoad
export type DpcTabularLoad<Schema extends OptionalTablesSchema> = {
  [tableName: string]:
    | {
        /// DpcTabularLoad.tableId
        tableId: TableIdFromSchema<Schema>;
        /// DpcTabularLoad.rowIdColumnName
        rowIdColumnName?: string;
      }
    | TableIdFromSchema<Schema>;
};

/// DpcTabularSave
export type DpcTabularSave<Schema extends OptionalTablesSchema> = {
  [TableId in TableIdFromSchema<Schema>]:
    | {
        /// DpcTabularSave.tableName
        tableName: string;
        /// DpcTabularSave.rowIdColumnName
        rowIdColumnName?: string;
        /// DpcTabularSave.deleteEmptyColumns
        deleteEmptyColumns?: boolean;
        /// DpcTabularSave.deleteEmptyTable
        deleteEmptyTable?: boolean;
      }
    | string;
};

/// DpcTabularValues
export type DpcTabularValues = {
  /// DpcTabularValues.load
  load?: boolean;
  /// DpcTabularValues.save
  save?: boolean;
  /// DpcTabularValues.tableName
  tableName?: string;
};

/// Persister
export interface Persister<
  in out Schemas extends OptionalSchemas,
  SupportsMergeableStore extends boolean = false,
> {
  /// Persister.load
  load(initialContent?: Content<Schemas, true>): Promise<this>;

  /// Persister.startAutoLoad
  startAutoLoad(initialContent?: Content<Schemas, true>): Promise<this>;

  /// Persister.stopAutoLoad
  stopAutoLoad(): this;

  /// Persister.isAutoLoading
  isAutoLoading(): boolean;

  /// Persister.save
  save(): Promise<this>;

  /// Persister.startAutoSave
  startAutoSave(): Promise<this>;

  /// Persister.stopAutoSave
  stopAutoSave(): this;

  /// Persister.isAutoSaving
  isAutoSaving(): boolean;

  /// Persister.schedule
  schedule(...actions: Promise<any>[]): Promise<this>;

  /// Persister.getStore
  getStore(): PersistedStore<Schemas, SupportsMergeableStore>;

  /// Persister.destroy
  destroy(): this;

  /// Persister.getStats
  getStats(): PersisterStats;
}

/// createCustomPersister
export function createCustomPersister<
  Schemas extends OptionalSchemas,
  ListeningHandle,
  SupportsMergeableStore extends boolean = false,
>(
  store: PersistedStore<Schemas, SupportsMergeableStore>,
  getPersisted: () => Promise<
    PersistedContent<Schemas, SupportsMergeableStore> | undefined
  >,
  setPersisted: (
    getContent: () => PersistedContent<Schemas, SupportsMergeableStore>,
    changes?: PersistedChanges<Schemas, SupportsMergeableStore>,
  ) => Promise<void>,
  addPersisterListener: (
    listener: PersisterListener<Schemas, SupportsMergeableStore>,
  ) => ListeningHandle,
  delPersisterListener: (listeningHandle: ListeningHandle) => void,
  onIgnoredError?: (error: any) => void,
  supportsMergeableStore?: SupportsMergeableStore,
): Persister<Schemas, SupportsMergeableStore>;
