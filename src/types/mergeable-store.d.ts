/// mergeable-store

import {CellOrUndefined, Store, ValueOrUndefined} from './store.d';
import {Id} from './common';
import {IdObj} from '../common/obj';

/// Hash
export type Hash = number;

/// Time
export type Time = string;

/// HashStamp
export type HashStamp<Thing> = [time: Time, thing: Thing, hash: Hash];

/// Stamp
export type Stamp<Thing> = [time: Time, thing: Thing];

/// MergeableContent
export type MergeableContent = HashStamp<
  [
    mergeableTables: HashStamp<
      IdObj<HashStamp<IdObj<HashStamp<IdObj<HashStamp<CellOrUndefined>>>>>>
    >,
    mergeableValues: HashStamp<IdObj<HashStamp<ValueOrUndefined>>>,
  ]
>;

/// MergeableChanges
export type MergeableChanges = Stamp<
  [
    mergeableTables: Stamp<
      IdObj<Stamp<IdObj<Stamp<IdObj<Stamp<CellOrUndefined>>>>>>
    >,
    mergeableValues: Stamp<IdObj<Stamp<ValueOrUndefined>>>,
  ]
>;

/// MergeableStore
export interface MergeableStore extends Store {
  //
  /// MergeableStore.merge
  merge(mergeableStore: MergeableStore): MergeableStore;

  /// MergeableStore.getMergeableContent
  getMergeableContent<AsChanges extends boolean = false>(
    asChanges?: AsChanges,
  ): AsChanges extends true ? MergeableChanges : MergeableContent;

  /// MergeableStore.setMergeableContent
  setMergeableContent(mergeableContent: MergeableContent): MergeableStore;

  /// MergeableStore.getTransactionMergeableChanges
  getTransactionMergeableChanges(): MergeableChanges;

  /// MergeableStore.applyMergeableChanges
  applyMergeableChanges(
    mergeableChanges: MergeableChanges | MergeableContent,
  ): MergeableStore;

  /// MergeableStore.getContentHash
  getContentHash(): Hash;

  /// MergeableStore.getTablesHash
  getTablesHash(): Hash;

  /// MergeableStore.getTableHash
  getTableHash(tableId: Id): Hash;

  /// MergeableStore.getRowHash
  getRowHash(tableId: Id, rowId: Id): Hash;

  /// MergeableStore.getCellHash
  getCellHash(tableId: Id, rowId: Id, cellId: Id): Hash;

  /// MergeableStore.getValuesHash
  getValuesHash(): Hash;

  /// MergeableStore.getValueHash
  getValueHash(valueId: Id): Hash;
}

/// createMergeableStore
export function createMergeableStore(id: Id): MergeableStore;
