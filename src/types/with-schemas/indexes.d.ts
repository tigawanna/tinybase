/// indexes

import {
  CellIdFromSchema,
  GetCellAlias,
  TableIdFromSchema,
} from './internal/store';
import {Id, IdOrNull, Ids, SortKey} from './common.d';
import {
  NoSchemas,
  NoTablesSchema,
  OptionalSchemas,
  OptionalTablesSchema,
  RowCallback,
  Store,
} from './store.d';

/// Index
export type Index = {[sliceId: Id]: Slice};

/// Slice
export type Slice = Ids;

/// IndexCallback
export type IndexCallback<in out Schema extends OptionalTablesSchema> = (
  indexId: Id,
  forEachSlice: (sliceCallback: SliceCallback<Schema>) => void,
) => void;

/// SliceCallback
export type SliceCallback<
  in out Schema extends OptionalTablesSchema = NoTablesSchema,
> = (
  sliceId: Id,
  forEachRow: (rowCallback: RowCallback<Schema>) => void,
) => void;

/// SliceIdsListener
export type SliceIdsListener<
  in out Schemas extends OptionalSchemas = NoSchemas,
> = (indexes: Indexes<Schemas>, indexId: Id) => void;

/// SliceRowIdsListener
export type SliceRowIdsListener<
  in out Schemas extends OptionalSchemas = NoSchemas,
> = (indexes: Indexes<Schemas>, indexId: Id, sliceId: Id) => void;

/// IndexesListenerStats
export type IndexesListenerStats = {
  /// IndexesListenerStats.sliceIds
  sliceIds?: number;
  /// IndexesListenerStats.sliceRowIds
  sliceRowIds?: number;
};

/// Indexes
export interface Indexes<in out Schemas extends OptionalSchemas = NoSchemas> {
  /// Indexes.setIndexDefinition
  setIndexDefinition<
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
    GetCell = GetCellAlias<Schemas[0], TableId>,
  >(
    indexId: Id,
    tableId: TableId,
    getSliceIdOrIds?: CellId | ((getCell: GetCell, rowId: Id) => Id | Ids),
    getSortKey?: CellId | ((getCell: GetCell, rowId: Id) => SortKey),
    sliceIdSorter?: (sliceId1: Id, sliceId2: Id) => number,
    rowIdSorter?: (sortKey1: SortKey, sortKey2: SortKey, sliceId: Id) => number,
  ): Indexes<Schemas>;

  /// Indexes.delIndexDefinition
  delIndexDefinition(indexId: Id): Indexes<Schemas>;

  /// Indexes.getStore
  getStore(): Store<Schemas>;

  /// Indexes.getIndexIds
  getIndexIds(): Ids;

  /// Indexes.forEachIndex
  forEachIndex(indexCallback: IndexCallback<Schemas[0]>): void;

  /// Indexes.forEachSlice
  forEachSlice(indexId: Id, sliceCallback: SliceCallback<Schemas[0]>): void;

  /// Indexes.hasIndex
  hasIndex(indexId: Id): boolean;

  /// Indexes.hasSlice
  hasSlice(indexId: Id, sliceId: Id): boolean;

  /// Indexes.getTableId
  getTableId<TableId extends TableIdFromSchema<Schemas[0]>>(
    indexId: Id,
  ): TableId | undefined;

  /// Indexes.getSliceIds
  getSliceIds(indexId: Id): Ids;

  /// Indexes.getSliceRowIds
  getSliceRowIds(indexId: Id, sliceId: Id): Ids;

  /// Indexes.addSliceIdsListener
  addSliceIdsListener(indexId: IdOrNull, listener: SliceIdsListener): Id;

  /// Indexes.addSliceRowIdsListener
  addSliceRowIdsListener(
    indexId: IdOrNull,
    sliceId: IdOrNull,
    listener: SliceRowIdsListener,
  ): Id;

  /// Indexes.delListener
  delListener(listenerId: Id): Indexes<Schemas>;

  /// Indexes.destroy
  destroy(): void;

  /// Indexes.getListenerStats
  getListenerStats(): IndexesListenerStats;
}

/// createIndexes
export function createIndexes<Schemas extends OptionalSchemas>(
  store: Store<Schemas>,
): Indexes<Schemas>;