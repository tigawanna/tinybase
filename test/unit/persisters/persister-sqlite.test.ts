/* eslint-disable max-len */
import 'fake-indexeddb/auto';
import {Persister, Store, createStore} from 'tinybase/debug';
import {VARIANTS, getDatabaseFunctions} from './sqlite';
import {Database} from 'sqlite3';
import {mockFetchWasm} from '../common/other';

describe.each(Object.entries(VARIANTS))(
  '%s',
  (_name, [getOpenDatabase, getPersister, cmd, close]) => {
    const [getDatabase, setDatabase] = getDatabaseFunctions(cmd);

    let db: Database;
    let store1: Store;
    let persister1: Persister;

    beforeEach(async () => {
      mockFetchWasm();
      db = await getOpenDatabase();
      store1 = createStore();
    });

    afterEach(async () => await close(db));

    describe('Serialized', () => {
      beforeEach(async () => {
        persister1 = getPersister(store1, db);
      });

      describe('Custom table name', () => {
        test('as string', async () => {
          const persister = getPersister(store1, db, 'test');
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test',
              'CREATE TABLE "test"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{}]'}],
            ],
          ]);
        });

        test('with spaces', async () => {
          const persister = getPersister(store1, db, 'test table');
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test table',
              'CREATE TABLE "test table"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{}]'}],
            ],
          ]);
        });

        test('with quote', async () => {
          const persister = getPersister(store1, db, 'test "table"');
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test "table"',
              'CREATE TABLE "test ""table"""("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{}]'}],
            ],
          ]);
        });

        test('as config', async () => {
          const persister = getPersister(store1, db, {
            serialized: true,
            storeTable: 'test',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test',
              'CREATE TABLE "test"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{}]'}],
            ],
          ]);
        });
      });

      describe('Save to empty database', () => {
        test('nothing', async () => {
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{}]'}],
            ],
          ]);
        });

        test('tables', async () => {
          store1.setTables({t1: {r1: {c1: 1}}});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{}]'}],
            ],
          ]);
        });

        test('values', async () => {
          store1.setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{},{"v1":1}]'}],
            ],
          ]);
        });

        test('both', async () => {
          store1.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{"v1":1}]'}],
            ],
          ]);
        });

        test('both, change, and then load again', async () => {
          store1.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{"v1":1}]'}],
            ],
          ]);
          await cmd(db, 'UPDATE tinybase SET store=? WHERE _id=?', [
            '[{"t1":{"r1":{"c1":2}}},{"v1":2}]',
            '_',
          ]);
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":2}}},{"v1":2}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 2}}}, {v1: 2}]);
        });
      });

      describe('Load from database', () => {
        test('nothing', async () => {
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {}]);
        });

        test('defaulted', async () => {
          await persister1.load({t1: {r1: {c1: 1}}}, {v1: 1});
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('broken', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":1}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {}]);
        });

        test('broken, can default', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":}]'}],
            ],
          ]);
          await persister1.load({t1: {r1: {c1: 1}}}, {v1: 1});
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('tables', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {}]);
        });

        test('values', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{}, {"v1":1}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {v1: 1}]);
        });

        test('both', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{"v1":1}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('both, change, and then save again', async () => {
          await setDatabase(db, [
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":1}}},{"v1":1}]'}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
          store1.setCell('t1', 'r1', 'c1', 2).setValue('v1', 2);
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 2}}}, {v1: 2}]);
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase',
              'CREATE TABLE "tinybase"("_id" PRIMARY KEY ON CONFLICT REPLACE, "store")',
              [{_id: '_', store: '[{"t1":{"r1":{"c1":2}}},{"v1":2}]'}],
            ],
          ]);
        });
      });
    });

    describe('Non-serialized', () => {
      beforeEach(async () => {
        persister1 = getPersister(store1, db, {serialized: false});
      });

      describe('Custom row id column', () => {
        test('word', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            rowIdColumn: 'test',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("test" PRIMARY KEY ON CONFLICT REPLACE)',
              [{test: '_'}],
            ],
          ]);
        });

        test('with spaces', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            rowIdColumn: 'test table',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("test table" PRIMARY KEY ON CONFLICT REPLACE)',
              [{'test table': '_'}],
            ],
          ]);
        });

        test('with quote', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            rowIdColumn: 'test "table"',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("test ""table""" PRIMARY KEY ON CONFLICT REPLACE)',
              [{'test "table"': '_'}],
            ],
          ]);
        });
      });

      describe('Custom values table name', () => {
        test('word', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            valuesTable: 'test',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test',
              'CREATE TABLE "test"("_id" PRIMARY KEY ON CONFLICT REPLACE)',
              [{_id: '_'}],
            ],
          ]);
        });

        test('with spaces', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            valuesTable: 'test table',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test table',
              'CREATE TABLE "test table"("_id" PRIMARY KEY ON CONFLICT REPLACE)',
              [{_id: '_'}],
            ],
          ]);
        });

        test('with quote', async () => {
          const persister = getPersister(store1, db, {
            serialized: false,
            valuesTable: 'test "table"',
          });
          await persister.save();
          expect(await getDatabase(db)).toEqual([
            [
              'test "table"',
              'CREATE TABLE "test ""table"""("_id" PRIMARY KEY ON CONFLICT REPLACE)',
              [{_id: '_'}],
            ],
          ]);
        });
      });

      describe('Save to empty database', () => {
        test('nothing', async () => {
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE)',
              [{_id: '_'}],
            ],
          ]);
        });

        test('tables', async () => {
          store1.setTables({t1: {r1: {c1: 1}}});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE)',
              [{_id: '_'}],
            ],
          ]);
        });

        test('values', async () => {
          store1.setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
        });

        test('both', async () => {
          store1.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
        });

        test('both, change, and then load again', async () => {
          store1.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
          await cmd(db, 'UPDATE t1 SET c1=? WHERE _id=?', [2, 'r1']);
          await cmd(db, 'UPDATE tinybase_values SET v1=? WHERE _id=?', [
            2,
            '_',
          ]);
          expect(await getDatabase(db)).toEqual([
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 2}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 2}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 2}}}, {v1: 2}]);
        });
      });

      describe('Load from database', () => {
        test('nothing', async () => {
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {}]);
        });

        test('defaulted', async () => {
          await persister1.load({t1: {r1: {c1: 1}}}, {v1: 1});
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('broken', async () => {
          await setDatabase(db, [
            [
              't1',
              'CREATE TABLE "t1"("di" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{di: 'r1', c1: 1}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {}]);
        });

        test('broken, can default', async () => {
          await setDatabase(db, [
            [
              't1',
              'CREATE TABLE "t1"("di" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{di: 'r1', c1: 1}],
            ],
          ]);
          await persister1.load({t1: {r1: {c1: 1}}}, {v1: 1});
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('tables', async () => {
          await setDatabase(db, [
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {}]);
        });

        test('values', async () => {
          await setDatabase(db, [
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{}, {v1: 1}]);
        });

        test('both', async () => {
          await setDatabase(db, [
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
        });

        test('both, change, and then save again', async () => {
          await setDatabase(db, [
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 1}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 1}],
            ],
          ]);
          await persister1.load();
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 1}}}, {v1: 1}]);
          store1.setCell('t1', 'r1', 'c1', 2).setValue('v1', 2);
          expect(store1.getContent()).toEqual([{t1: {r1: {c1: 2}}}, {v1: 2}]);
          await persister1.save();
          expect(await getDatabase(db)).toEqual([
            [
              't1',
              'CREATE TABLE "t1"("_id" PRIMARY KEY ON CONFLICT REPLACE, "c1")',
              [{_id: 'r1', c1: 2}],
            ],
            [
              'tinybase_values',
              'CREATE TABLE "tinybase_values"("_id" PRIMARY KEY ON CONFLICT REPLACE, "v1")',
              [{_id: '_', v1: 2}],
            ],
          ]);
        });
      });
    });
  },
);
