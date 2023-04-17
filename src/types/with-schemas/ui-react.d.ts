/// ui-react

import {
  AllCellIdFromSchema,
  CellFromSchema,
  CellIdFromSchema,
  CellIdsListenerAlias,
  CellListenerAlias,
  RowFromSchema,
  RowIdsListenerAlias,
  RowListenerAlias,
  SortedRowIdsListenerAlias,
  TableFromSchema,
  TableIdFromSchema,
  TableIdsListenerAlias,
  TableListenerAlias,
  TablesFromSchema,
  TablesListenerAlias,
  ValueFromSchema,
  ValueIdFromSchema,
  ValueIdsListenerAlias,
  ValueListenerAlias,
  ValuesFromSchema,
  ValuesListenerAlias,
} from './internal/store';
import {
  BackwardCheckpointsProps,
  CellProps,
  CheckpointProps,
  CheckpointsOrCheckpointsId,
  ComponentReturnType,
  CurrentCheckpointProps,
  ExtraProps,
  ForwardCheckpointsProps,
  IndexProps,
  IndexesOrIndexesId,
  LinkedRowsProps,
  LocalRowsProps,
  MetricProps,
  MetricsOrMetricsId,
  QueriesOrQueriesId,
  RelationshipsOrRelationshipsId,
  RemoteRowProps,
  ResultCellProps,
  ResultRowProps,
  ResultSortedTableProps,
  ResultTableProps,
  RowProps,
  SliceProps,
  SortedTableProps,
  StoreOrStoreId,
  TableProps,
  TablesProps,
  UndoOrRedoInformation,
  ValueProps,
  ValuesProps,
} from './internal/ui-react';
import {Callback, Id, IdOrNull, Ids, ParameterizedCallback} from './common.d';
import {Cell, OptionalSchemas, Row, Store, Table} from './store.d';
import {
  CheckpointIds,
  CheckpointIdsListener,
  CheckpointListener,
  Checkpoints,
} from './checkpoints.d';
import {Indexes, SliceIdsListener, SliceRowIdsListener} from './indexes.d';
import {
  LinkedRowIdsListener,
  LocalRowIdsListener,
  Relationships,
  RemoteRowIdListener,
} from './relationships.d';
import {MetricListener, Metrics} from './metrics.d';
import {ProviderProps, ReactElement} from 'react';
import {
  Queries,
  ResultCellIdsListener,
  ResultCellListener,
  ResultRowIdsListener,
  ResultRowListener,
  ResultTableListener,
} from './queries.d';
import {Persister} from './persisters.d';

export type WithSchemas<Schemas extends OptionalSchemas> = {
  /// StoreOrStoreId
  StoreOrStoreId: StoreOrStoreId<Schemas>;

  /// MetricsOrMetricsId
  MetricsOrMetricsId: MetricsOrMetricsId<Schemas>;

  /// IndexesOrIndexesId
  IndexesOrIndexesId: IndexesOrIndexesId<Schemas>;

  /// RelationshipsOrRelationshipsId
  RelationshipsOrRelationshipsId: RelationshipsOrRelationshipsId<Schemas>;

  /// QueriesOrQueriesId
  QueriesOrQueriesId: QueriesOrQueriesId<Schemas>;

  /// CheckpointsOrCheckpointsId
  CheckpointsOrCheckpointsId: CheckpointsOrCheckpointsId<Schemas>;

  /// UndoOrRedoInformation
  UndoOrRedoInformation: UndoOrRedoInformation;

  /// useCreateStore
  useCreateStore: (
    create: () => Store<Schemas>,
    createDeps?: React.DependencyList,
  ) => Store<Schemas>;

  /// useStore
  useStore: (id?: Id) => Store<Schemas> | undefined;

  /// useTables
  useTables: <Tables = TablesFromSchema<Schemas[0]>>(
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Tables;

  /// useTableIds
  useTableIds: <Ids = TableIdFromSchema<Schemas[0]>[]>(
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Ids;

  /// useTable
  useTable: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    Table = TableFromSchema<Schemas[0]>,
  >(
    tableId: TableId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Table;

  /// useRowIds
  useRowIds: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: TableId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Ids;

  /// useSortedRowIds
  useSortedRowIds: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
  >(
    tableId: TableId,
    cellId?: CellId,
    descending?: boolean,
    offset?: number,
    limit?: number,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Ids;

  /// useRow
  useRow: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    Row = RowFromSchema<Schemas[0], TableId>,
  >(
    tableId: TableId,
    rowId: Id,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Row;

  /// useCellIds
  useCellIds: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    Ids extends CellIdFromSchema<Schemas[0], TableId>[],
  >(
    tableId: TableId,
    rowId: Id,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Ids;

  /// useCell
  useCell: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
    CellOrUndefined = CellFromSchema<Schemas[0], TableId, CellId> | undefined,
  >(
    tableId: TableId,
    rowId: Id,
    cellId: CellId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => CellOrUndefined;

  /// useValues
  useValues: <Values = ValuesFromSchema<Schemas[1]>>(
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Values;

  /// useValueIds
  useValueIds: <Ids = ValueIdFromSchema<Schemas[1]>[]>(
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => Ids;

  /// useValue
  useValue: <
    ValueId extends ValueIdFromSchema<Schemas[1]>,
    ValueOrUndefined = ValueFromSchema<Schemas[1], ValueId> | undefined,
  >(
    valueId: ValueId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => ValueOrUndefined;

  /// useSetTablesCallback
  useSetTablesCallback: <
    Parameter,
    Tables extends TablesFromSchema<Schemas[0], true> = TablesFromSchema<
      Schemas[0],
      true
    >,
  >(
    getTables: (parameter: Parameter, store: Store<Schemas>) => Tables,
    getTablesDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, tables: Tables) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetTableCallback
  useSetTableCallback: <
    Parameter,
    TableId extends TableIdFromSchema<Schemas[0]>,
    Table extends TableFromSchema<Schemas[0], TableId, true> = TableFromSchema<
      Schemas[0],
      TableId,
      true
    >,
  >(
    tableId: TableId,
    getTable: (parameter: Parameter, store: Store<Schemas>) => Table,
    getTableDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, table: Table) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetRowCallback
  useSetRowCallback: <
    Parameter,
    TableId extends TableIdFromSchema<Schemas[0]>,
    Row extends RowFromSchema<Schemas[0], TableId, true> = RowFromSchema<
      Schemas[0],
      TableId,
      true
    >,
  >(
    tableId: TableId,
    rowId: Id,
    getRow: (parameter: Parameter, store: Store<Schemas>) => Row,
    getRowDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, row: Row) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useAddRowCallback
  useAddRowCallback: <
    Parameter,
    TableId extends TableIdFromSchema<Schemas[0]>,
    Row extends RowFromSchema<Schemas[0], TableId, true> = RowFromSchema<
      Schemas[0],
      TableId,
      true
    >,
  >(
    tableId: TableId,
    getRow: (parameter: Parameter, store: Store<Schemas>) => Row,
    getRowDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (rowId: Id | undefined, store: Store<Schemas>, row: Row) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetPartialRowCallback
  useSetPartialRowCallback: <
    Parameter,
    TableId extends TableIdFromSchema<Schemas[0]>,
    Row extends RowFromSchema<Schemas[0], TableId, true> = RowFromSchema<
      Schemas[0],
      TableId,
      true
    >,
  >(
    tableId: TableId,
    rowId: Id,
    getPartialRow: (parameter: Parameter, store: Store<Schemas>) => Row,
    getPartialRowDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, partialRow: Row) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetCellCallback
  useSetCellCallback: <
    Parameter,
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
    Cell extends CellFromSchema<Schemas[0], TableId, CellId> = CellFromSchema<
      Schemas[0],
      TableId,
      CellId
    >,
    MapCell extends (cell: Cell | undefined) => Cell = (
      cell: Cell | undefined,
    ) => Cell,
  >(
    tableId: TableId,
    rowId: Id,
    cellId: CellId,
    getCell: (parameter: Parameter, store: Store<Schemas>) => Cell | MapCell,
    getCellDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, cell: Cell | MapCell) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetValuesCallback
  useSetValuesCallback: <
    Parameter,
    Values extends ValuesFromSchema<Schemas[1], true> = ValuesFromSchema<
      Schemas[1],
      true
    >,
  >(
    getValues: (parameter: Parameter, store: Store<Schemas>) => Values,
    getValuesDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, values: Values) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetPartialValuesCallback
  useSetPartialValuesCallback: <
    Parameter,
    Values extends ValuesFromSchema<Schemas[1], true> = ValuesFromSchema<
      Schemas[1],
      true
    >,
  >(
    getPartialValues: (parameter: Parameter, store: Store<Schemas>) => Values,
    getPartialValuesDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, partialValues: Values) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useSetValueCallback
  useSetValueCallback: <
    Parameter,
    ValueId extends ValueIdFromSchema<Schemas[1]>,
    Value extends ValueFromSchema<Schemas[1], ValueId> = ValueFromSchema<
      Schemas[1],
      ValueId
    >,
    MapValue extends (value: Value | undefined) => Value = (
      value: Value | undefined,
    ) => Value,
  >(
    valueId: ValueId,
    getValue: (parameter: Parameter, store: Store<Schemas>) => Value | MapValue,
    getValueDeps?: React.DependencyList,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>, value: Value) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useDelTablesCallback
  useDelTablesCallback: (
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useDelTableCallback
  useDelTableCallback: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: TableId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useDelRowCallback
  useDelRowCallback: <TableId extends TableIdFromSchema<Schemas[0]>>(
    tableId: TableId,
    rowId: Id,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useDelCellCallback
  useDelCellCallback: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellId extends CellIdFromSchema<Schemas[0], TableId>,
  >(
    tableId: TableId,
    rowId: Id,
    cellId: CellId,
    forceDel?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useDelValuesCallback
  useDelValuesCallback: (
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useDelValueCallback
  useDelValueCallback: <ValueId extends ValueIdFromSchema<Schemas[1]>>(
    valueId: ValueId,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
    then?: (store: Store<Schemas>) => void,
    thenDeps?: React.DependencyList,
  ) => Callback;

  /// useTablesListener
  useTablesListener: <TablesListener extends TablesListenerAlias<Schemas>>(
    listener: TablesListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useTableIdsListener
  useTableIdsListener: <
    TableIdsListener extends TableIdsListenerAlias<Schemas>,
  >(
    listener: TableIdsListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useTableListener
  useTableListener: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    TableListener extends TableListenerAlias<Schemas, TableIdOrNull>,
  >(
    tableId: TableIdOrNull,
    listener: TableListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useRowIdsListener
  useRowIdsListener: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdsListener extends RowIdsListenerAlias<Schemas, TableIdOrNull>,
  >(
    tableId: TableIdOrNull,
    listener: RowIdsListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useSortedRowIdsListener
  useSortedRowIdsListener: <
    TableId extends TableIdFromSchema<Schemas[0]>,
    CellIdOrUndefined extends CellIdFromSchema<Schemas[0], TableId> | undefined,
    Descending extends boolean,
    Offset extends number,
    Limit extends number | undefined,
    SortedRowIdsListener extends SortedRowIdsListenerAlias<
      Schemas,
      TableId,
      CellIdOrUndefined,
      Descending,
      Offset,
      Limit
    >,
  >(
    tableId: TableId,
    cellId: CellIdOrUndefined,
    descending: Descending,
    offset: Offset,
    limit: Limit,
    listener: SortedRowIdsListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useRowListener
  useRowListener: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
    RowListener extends RowListenerAlias<Schemas, TableIdOrNull, RowIdOrNull>,
  >(
    tableId: TableIdOrNull,
    rowId: RowIdOrNull,
    listener: RowListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useCellIdsListener
  useCellIdsListener: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
    CellIdsListener extends CellIdsListenerAlias<
      Schemas,
      TableIdOrNull,
      RowIdOrNull
    >,
  >(
    tableId: TableIdOrNull,
    rowId: RowIdOrNull,
    listener: CellIdsListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useCellListener
  useCellListener: <
    TableIdOrNull extends TableIdFromSchema<Schemas[0]> | null,
    RowIdOrNull extends IdOrNull,
    CellIdOrNull extends
      | (TableIdOrNull extends TableIdFromSchema<Schemas[0]>
          ? CellIdFromSchema<Schemas[0], TableIdOrNull>
          : AllCellIdFromSchema<Schemas[0]>)
      | null,
    CellListener extends CellListenerAlias<
      Schemas,
      TableIdOrNull,
      RowIdOrNull,
      CellIdOrNull
    >,
  >(
    tableId: TableIdOrNull,
    rowId: RowIdOrNull,
    cellId: CellIdOrNull,
    listener: CellListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useValuesListener
  useValuesListener: <ValuesListener extends ValuesListenerAlias<Schemas>>(
    listener: ValuesListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useValueIdsListener
  useValueIdsListener: <
    ValueIdsListener extends ValueIdsListenerAlias<Schemas>,
  >(
    listener: ValueIdsListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useValueListener
  useValueListener: <
    ValueIdOrNull extends ValueIdFromSchema<Schemas[1]> | null,
    ValueListener extends ValueListenerAlias<Schemas, ValueIdOrNull>,
  >(
    valueId: ValueIdOrNull,
    listener: ValueListener,
    listenerDeps?: React.DependencyList,
    mutator?: boolean,
    storeOrStoreId?: StoreOrStoreId<Schemas>,
  ) => void;

  /// useCreateMetrics
  useCreateMetrics: (
    store: Store<Schemas>,
    create: (store: Store<Schemas>) => Metrics<Schemas>,
    createDeps?: React.DependencyList,
  ) => Metrics<Schemas>;

  /// useMetrics
  useMetrics: (id?: Id) => Metrics<Schemas> | undefined;

  /// useMetric
  useMetric: (
    metricId: Id,
    metricsOrMetricsId?: MetricsOrMetricsId<Schemas>,
  ) => number | undefined;

  /// useMetricListener
  useMetricListener: (
    metricId: IdOrNull,
    listener: MetricListener<Schemas>,
    listenerDeps?: React.DependencyList,
    metricsOrMetricsId?: MetricsOrMetricsId<Schemas>,
  ) => void;

  /// useCreateIndexes
  useCreateIndexes: (
    store: Store<Schemas>,
    create: (store: Store<Schemas>) => Indexes<Schemas>,
    createDeps?: React.DependencyList,
  ) => Indexes<Schemas>;

  /// useIndexes
  useIndexes: (id?: Id) => Indexes<Schemas> | undefined;

  /// useSliceIds
  useSliceIds: (
    indexId: Id,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => Ids;

  /// useSliceRowIds
  useSliceRowIds: (
    indexId: Id,
    sliceId: Id,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => Ids;

  /// useSliceIdsListener
  useSliceIdsListener: (
    indexId: IdOrNull,
    listener: SliceIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => void;

  /// useSliceRowIdsListener
  useSliceRowIdsListener: (
    indexId: IdOrNull,
    sliceId: IdOrNull,
    listener: SliceRowIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    indexesOrIndexesId?: IndexesOrIndexesId<Schemas>,
  ) => void;

  /// useCreateRelationships
  useCreateRelationships: (
    store: Store<Schemas>,
    create: (store: Store<Schemas>) => Relationships<Schemas>,
    createDeps?: React.DependencyList,
  ) => Relationships<Schemas>;

  /// useRelationships
  useRelationships: (id?: Id) => Relationships<Schemas> | undefined;

  /// useRemoteRowId
  useRemoteRowId: (
    relationshipId: Id,
    localRowId: Id,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => Id | undefined;

  /// useLocalRowIds
  useLocalRowIds: (
    relationshipId: Id,
    remoteRowId: Id,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => Ids;

  /// useLinkedRowIds
  useLinkedRowIds: (
    relationshipId: Id,
    firstRowId: Id,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => Ids;

  /// useRemoteRowIdListener
  useRemoteRowIdListener: (
    relationshipId: IdOrNull,
    localRowId: IdOrNull,
    listener: RemoteRowIdListener<Schemas>,
    listenerDeps?: React.DependencyList,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /// useLocalRowIdsListener
  useLocalRowIdsListener: (
    relationshipId: IdOrNull,
    remoteRowId: IdOrNull,
    listener: LocalRowIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /// useLinkedRowIdsListener
  useLinkedRowIdsListener: (
    relationshipId: Id,
    firstRowId: Id,
    listener: LinkedRowIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    relationshipsOrRelationshipsId?: RelationshipsOrRelationshipsId<Schemas>,
  ) => void;

  /// useCreateQueries
  useCreateQueries: (
    store: Store<Schemas>,
    create: (store: Store<Schemas>) => Queries<Schemas>,
    createDeps?: React.DependencyList,
  ) => Queries<Schemas>;

  /// useQueries
  useQueries: (id?: Id) => Queries<Schemas> | undefined;

  /// useResultTable
  useResultTable: (
    queryId: Id,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Table;

  /// useResultRowIds
  useResultRowIds: (
    queryId: Id,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Ids;

  /// useResultSortedRowIds
  useResultSortedRowIds: (
    queryId: Id,
    cellId?: Id,
    descending?: boolean,
    offset?: number,
    limit?: number,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Ids;

  /// useResultRow
  useResultRow: (
    queryId: Id,
    rowId: Id,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Row;

  /// useResultCellIds
  useResultCellIds: (
    queryId: Id,
    rowId: Id,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Ids;

  /// useResultCell
  useResultCell: (
    queryId: Id,
    rowId: Id,
    cellId: Id,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => Cell | undefined;

  /// useResultTableListener
  useResultTableListener: (
    queryId: IdOrNull,
    listener: ResultTableListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useResultRowIdsListener
  useResultRowIdsListener: (
    queryId: IdOrNull,
    listener: ResultRowIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useResultSortedRowIdsListener
  useResultSortedRowIdsListener: (
    queryId: Id,
    cellId: Id | undefined,
    descending: boolean,
    offset: number,
    limit: number | undefined,
    listener: ResultRowIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useResultRowListener
  useResultRowListener: (
    queryId: IdOrNull,
    rowId: IdOrNull,
    listener: ResultRowListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useResultCellIdsListener
  useResultCellIdsListener: (
    queryId: IdOrNull,
    rowId: IdOrNull,
    listener: ResultCellIdsListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useResultCellListener
  useResultCellListener: (
    queryId: IdOrNull,
    rowId: IdOrNull,
    cellId: IdOrNull,
    listener: ResultCellListener<Schemas>,
    listenerDeps?: React.DependencyList,
    queriesOrQueriesId?: QueriesOrQueriesId<Schemas>,
  ) => void;

  /// useCreateCheckpoints
  useCreateCheckpoints: (
    store: Store<Schemas>,
    create: (store: Store) => Checkpoints<Schemas>,
    createDeps?: React.DependencyList,
  ) => Checkpoints<Schemas>;

  /// useCheckpoints
  useCheckpoints: (id?: Id) => Checkpoints<Schemas> | undefined;

  /// useCheckpointIds
  useCheckpointIds: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => CheckpointIds;

  /// useCheckpoint
  useCheckpoint: (
    checkpointId: Id,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => string | undefined;

  /// useSetCheckpointCallback
  useSetCheckpointCallback: <Parameter>(
    getCheckpoint?: (parameter: Parameter) => string,
    getCheckpointDeps?: React.DependencyList,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
    then?: (
      checkpointId: Id,
      checkpoints: Checkpoints<Schemas>,
      label?: string,
    ) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useGoBackwardCallback
  useGoBackwardCallback: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => Callback;

  /// useGoForwardCallback
  useGoForwardCallback: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => Callback;

  /// useGoToCallback
  useGoToCallback: <Parameter>(
    getCheckpointId: (parameter: Parameter) => Id,
    getCheckpointIdDeps?: React.DependencyList,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
    then?: (checkpoints: Checkpoints<Schemas>, checkpointId: Id) => void,
    thenDeps?: React.DependencyList,
  ) => ParameterizedCallback<Parameter>;

  /// useUndoInformation
  useUndoInformation: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => UndoOrRedoInformation;

  /// useRedoInformation
  useRedoInformation: (
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => UndoOrRedoInformation;

  /// useCheckpointIdsListener
  useCheckpointIdsListener: (
    listener: CheckpointIdsListener,
    listenerDeps?: React.DependencyList,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => void;

  /// useCheckpointListener
  useCheckpointListener: (
    checkpointId: IdOrNull,
    listener: CheckpointListener,
    listenerDeps?: React.DependencyList,
    checkpointsOrCheckpointsId?: CheckpointsOrCheckpointsId<Schemas>,
  ) => void;

  /// useCreatePersister
  useCreatePersister: (
    store: Store<Schemas>,
    create: (store: Store<Schemas>) => Persister<Schemas>,
    createDeps?: React.DependencyList,
    then?: (persister: Persister<Schemas>) => Promise<void>,
    thenDeps?: React.DependencyList,
  ) => Persister<Schemas>;

  /// ExtraProps
  ExtraProps: ExtraProps;

  /// TablesProps
  TablesProps: TablesProps<Schemas>;

  /// TableProps
  TableProps: TableProps<Schemas>;

  /// SortedTableProps
  SortedTableProps: SortedTableProps<Schemas>;

  /// RowProps
  RowProps: RowProps<Schemas>;

  /// CellProps
  CellProps: CellProps<Schemas>;

  /// ValuesProps
  ValuesProps: ValuesProps<Schemas>;

  /// ValueProps
  ValueProps: ValueProps<Schemas>;

  /// MetricProps
  MetricProps: MetricProps<Schemas>;

  /// IndexProps
  IndexProps: IndexProps<Schemas>;

  /// SliceProps
  SliceProps: SliceProps<Schemas>;

  /// RemoteRowProps
  RemoteRowProps: RemoteRowProps<Schemas>;

  /// LocalRowsProps
  LocalRowsProps: LocalRowsProps<Schemas>;

  /// LinkedRowsProps
  LinkedRowsProps: LinkedRowsProps<Schemas>;

  /// ResultTableProps
  ResultTableProps: ResultTableProps<Schemas>;

  /// ResultSortedTableProps
  ResultSortedTableProps: ResultSortedTableProps<Schemas>;

  /// ResultRowProps
  ResultRowProps: ResultRowProps<Schemas>;

  /// ResultCellProps
  ResultCellProps: ResultCellProps<Schemas>;

  /// CheckpointProps
  CheckpointProps: CheckpointProps<Schemas>;

  /// BackwardCheckpointsProps
  BackwardCheckpointsProps: BackwardCheckpointsProps<Schemas>;

  /// CurrentCheckpointProps
  CurrentCheckpointProps: CurrentCheckpointProps<Schemas>;

  /// ForwardCheckpointsProps
  ForwardCheckpointsProps: ForwardCheckpointsProps<Schemas>;

  /// ProviderProps
  ProviderProps: ProviderProps<Schemas>;

  /// ComponentReturnType
  ComponentReturnType: ReactElement<any, any> | null;

  /// Provider
  Provider: (
    props: ProviderProps<Schemas> & {children: React.ReactNode},
  ) => ComponentReturnType;

  /// CellView
  CellView: (props: CellProps<Schemas>) => ComponentReturnType;

  /// RowView
  RowView: (props: RowProps<Schemas>) => ComponentReturnType;

  /// SortedTableView
  SortedTableView: (props: SortedTableProps<Schemas>) => ComponentReturnType;

  /// TableView
  TableView: (props: TableProps<Schemas>) => ComponentReturnType;

  /// TablesView
  TablesView: (props: TablesProps<Schemas>) => ComponentReturnType;

  /// ValueView
  ValueView: (props: ValueProps<Schemas>) => ComponentReturnType;

  /// ValuesView
  ValuesView: (props: ValuesProps<Schemas>) => ComponentReturnType;

  /// MetricView
  MetricView: (props: MetricProps<Schemas>) => ComponentReturnType;

  /// SliceView
  SliceView: (props: SliceProps<Schemas>) => ComponentReturnType;

  /// IndexView
  IndexView: (props: IndexProps<Schemas>) => ComponentReturnType;

  /// RemoteRowView
  RemoteRowView: (props: RemoteRowProps<Schemas>) => ComponentReturnType;

  /// LocalRowsView
  LocalRowsView: (props: LocalRowsProps<Schemas>) => ComponentReturnType;

  /// LinkedRowsView
  LinkedRowsView: (props: LinkedRowsProps<Schemas>) => ComponentReturnType;

  /// ResultCellView
  ResultCellView: (props: ResultCellProps<Schemas>) => ComponentReturnType;

  /// ResultRowView
  ResultRowView: (props: ResultRowProps<Schemas>) => ComponentReturnType;

  /// ResultSortedTableView
  ResultSortedTableView: (
    props: ResultSortedTableProps<Schemas>,
  ) => ComponentReturnType;

  /// ResultTableView
  ResultTableView: (props: ResultTableProps<Schemas>) => ComponentReturnType;

  /// CheckpointView
  CheckpointView: (props: CheckpointProps<Schemas>) => ComponentReturnType;

  /// BackwardCheckpointsView
  BackwardCheckpointsView: (
    props: BackwardCheckpointsProps<Schemas>,
  ) => ComponentReturnType;

  /// CurrentCheckpointView
  CurrentCheckpointView: (
    props: CurrentCheckpointProps<Schemas>,
  ) => ComponentReturnType;

  /// ForwardCheckpointsView
  ForwardCheckpointsView: (
    props: ForwardCheckpointsProps<Schemas>,
  ) => ComponentReturnType;
};