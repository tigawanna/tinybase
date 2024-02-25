/* eslint-disable jest/no-conditional-expect */

import {
  Changes,
  Content,
  MergeableChanges,
  MergeableContent,
  MergeableStore,
  Persister,
  Store,
  createCustomPersister,
  createMergeableStore,
  createStore,
} from 'tinybase/debug';
import {GetLocationMethod, Persistable, nextLoop} from './common';
import {START_TIME} from '../common/mergeable';
import {pause} from '../common/other';

beforeEach(() => jest.useFakeTimers({now: START_TIME}));

afterEach(() => jest.useRealTimers());

test('Not supported, MergeableStore', async () => {
  const store = createMergeableStore('s1');
  let persisted = '';
  const persister = createCustomPersister(
    store,
    async () => [{t1: {r1: {c1: 1}}}, {v1: 1}],
    async (getContent: () => any) => {
      persisted = JSON.stringify(getContent());
    },
    () => null,
    () => null,
  );
  await persister.load();
  await persister.save();
  persister.destroy();
  expect(persisted).toEqual('[{"t1":{"r1":{"c1":1}}},{"v1":1}]');
});

test('Supported, Store', async () => {
  const store = createStore();
  let persisted = '';
  const persister = createCustomPersister(
    store,
    async () => [{t1: {r1: {c1: 1}}}, {v1: 1}],
    async (getContent: () => any) => {
      persisted = JSON.stringify(getContent());
    },
    () => null,
    () => null,
    () => null,
    true,
  );
  await persister.load();
  await persister.save();
  persister.destroy();
  expect(persisted).toEqual('[{"t1":{"r1":{"c1":1}}},{"v1":1}]');
});

describe('Supported, MergeableStore', () => {
  test('Content in setPersisted', async () => {
    const store = createMergeableStore('s1');
    const content: MergeableContent = [
      'HeS2L2000000FG2W',
      [
        [
          'HeS2L2000000FG2W',
          {
            t1: [
              'HeS2L2000000FG2W',
              {r1: ['HeS2L2000000FG2W', {c1: ['HeS2L2000000FG2W', 1]}]},
            ],
          },
        ],
        ['HeS2L2000000FG2W', {v1: ['HeS2L2000000FG2W', 1]}],
      ],
    ];
    let persisted = '';
    const persister = createCustomPersister(
      store,
      async () => content,
      async (getContent: () => Content | MergeableContent) => {
        persisted = JSON.stringify(getContent());
      },
      () => null,
      () => null,
      () => null,
      true,
    );
    await persister.load();
    await persister.save();
    persister.destroy();
    expect(persisted).toEqual(JSON.stringify(content));
  });

  test('Changes in setPersisted', async () => {
    const store = createMergeableStore('s1');
    const persisted: string[] = [];
    const persister = createCustomPersister(
      store,
      async () => [{}, {}],
      async (
        _getContent: () => Content | MergeableContent,
        getChanges?: () => Changes | MergeableChanges,
      ) => {
        const changes = getChanges?.();
        if (changes != undefined) {
          persisted.push(JSON.stringify(changes));
        }
      },
      () => null,
      () => null,
      () => null,
      true,
    );
    await persister.startAutoSave();
    store.setCell('t1', 'r1', 'c1', 1);
    store.setValue('v1', 1);
    await pause(1, true);
    persister.destroy();
    expect(persisted).toEqual([
      JSON.stringify([
        'HeS2L2000000FG2W',
        [
          [
            'HeS2L2000000FG2W',
            {
              t1: [
                'HeS2L2000000FG2W',
                {r1: ['HeS2L2000000FG2W', {c1: ['HeS2L2000000FG2W', 1]}]},
              ],
            },
          ],
          ['HeS2L2000000FG2W', {}],
        ],
      ]),
      JSON.stringify([
        'HeS2L2000010FG2W',
        [
          ['HeS2L2000010FG2W', {}],
          ['HeS2L2000010FG2W', {v1: ['HeS2L2000010FG2W', 1]}],
        ],
      ]),
    ]);
  });

  test('loading from legacy', async () => {
    const store = createMergeableStore('s1');
    let persisted = '';
    const persister = createCustomPersister(
      store,
      async () => [{t1: {r1: {c1: 1}}}, {v1: 1}],
      async (getContent: () => any) => {
        persisted = JSON.stringify(getContent());
      },
      () => null,
      () => null,
      () => null,
      true,
    );
    await persister.load();
    await persister.save();
    persister.destroy();
    expect(persisted).toEqual(
      JSON.stringify([
        'HeS2L2000000FG2W',
        [
          [
            'HeS2L2000000FG2W',
            {
              t1: [
                'HeS2L2000000FG2W',
                {r1: ['HeS2L2000000FG2W', {c1: ['HeS2L2000000FG2W', 1]}]},
              ],
            },
          ],
          ['HeS2L2000000FG2W', {v1: ['HeS2L2000000FG2W', 1]}],
        ],
      ]),
    );
  });
});

// Mirrors persisters.test
describe('Full sequence', () => {
  let customPersister: any;
  let customPersisterListener:
    | ((getContent?: () => MergeableContent) => void)
    | ((
        getContent?: () => MergeableContent,
        getChanges?: () => MergeableChanges,
      ) => void)
    | undefined;
  let customPersisterChanges: Changes = [{}, {}];

  const getMockedCustom = (
    write: (location: string, rawMergeableContent: any) => Promise<void>,
  ): Persistable => ({
    autoLoadPause: 100,
    getLocation: async (): Promise<string> => '',
    getLocationMethod: ['getFoo', () => 'foo'],
    getPersister: (store: Store) => {
      customPersister = '';
      return createCustomPersister(
        store,
        async () => {
          try {
            return JSON.parse(customPersister);
          } catch {}
        },
        async (getMergeableContent, getMergeableChanges) => {
          customPersister = getMergeableContent();
          customPersisterChanges = getMergeableChanges?.() ?? [{}, {}];
        },
        (listener) => {
          customPersisterListener = listener;
        },
        () => (customPersisterListener = undefined),
        undefined,
        true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ['getFoo', 'foo'],
      );
    },
    get: async (): Promise<MergeableContent | void> => customPersister,
    set: async (
      location: string,
      mergeableContent: Content | MergeableContent,
    ): Promise<void> => await write(location, JSON.stringify(mergeableContent)),
    write,
    del: async (): Promise<void> => {
      customPersister = '';
    },
    getChanges: () => customPersisterChanges,
    testMissing: true,
  });

  const mockMergeableNoContentListener: Persistable<string> = getMockedCustom(
    async (_location: string, rawContent: any): Promise<void> => {
      customPersister = rawContent;
      customPersisterListener?.();
    },
  );

  const mockMergeableContentListener: Persistable<string> = getMockedCustom(
    async (_location: string, rawContent: any): Promise<void> => {
      customPersister = rawContent;
      let mergeableContent: MergeableContent;
      try {
        mergeableContent = JSON.parse(rawContent);
      } catch (e) {
        mergeableContent = [] as any;
      }
      customPersisterListener?.(() => mergeableContent);
    },
  );

  const mockMergeableChangesListener: Persistable<string> = getMockedCustom(
    async (_location: string, rawContent: any): Promise<void> => {
      customPersister = rawContent;
      let mergeableContent: MergeableContent;
      try {
        mergeableContent = JSON.parse(rawContent);
      } catch (e) {
        mergeableContent = [] as any;
      }
      customPersisterListener?.(
        () => mergeableContent, // content
        () => mergeableContent, // changes
      );
    },
  );

  describe.each([
    ['mockMergeableNoContentListener', mockMergeableNoContentListener],
    ['mockMergeableContentListener', mockMergeableContentListener],
    ['mockMergeableChangesListener', mockMergeableChangesListener],
  ])('Persists to/from %s', (name: string, persistable: Persistable<any>) => {
    let location: string;
    let getLocationMethod: GetLocationMethod<any> | undefined;
    let store: MergeableStore;
    let persister: Persister;

    beforeEach(async () => {
      if (persistable.beforeEach != null) {
        persistable.beforeEach();
      }
      store = createMergeableStore('store1');
      location = await persistable.getLocation();
      getLocationMethod = persistable.getLocationMethod;
      persister = persistable.getPersister(store, location);
    });

    afterEach(() => {
      persister.destroy();
      if (persistable.afterEach != null) {
        persistable.afterEach(location);
      }
    });

    // ---

    test('gets store', () => {
      expect(persister.getStore()).toEqual(store);
    });

    test('gets second parameter', () => {
      if (getLocationMethod) {
        expect((persister as any)[getLocationMethod[0]]()).toEqual(
          getLocationMethod[1](location),
        );
      }
    });

    test('saves', async () => {
      store.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
      await persister.save();
      expect(await persistable.get(location)).toEqual([
        {t1: {r1: {c1: 1}}},
        {v1: 1},
      ]);
      expect(persister.getStats()).toEqual({loads: 0, saves: 1});
    });

    test('autoSaves', async () => {
      store.setTables({t1: {r1: {c1: 1}}}).setValues({v1: 1});
      await persister.startAutoSave();
      expect(await persistable.get(location)).toEqual([
        {t1: {r1: {c1: 1}}},
        {v1: 1},
      ]);
      expect(persister.getStats()).toEqual({loads: 0, saves: 1});
      store.setTables({t1: {r1: {c1: 2}}});
      await pause(50, true);
      expect(await persistable.get(location)).toEqual([
        {t1: {r1: {c1: 2}}},
        {v1: 1},
      ]);
      store.setTables({t1: {r1: {c1: 2}}});
      await pause(50, true);
      expect(await persistable.get(location)).toEqual([
        {t1: {r1: {c1: 2}}},
        {v1: 1},
      ]);
      if (persistable.getChanges) {
        expect(persistable.getChanges()).toEqual([{t1: {r1: {c1: 2}}}, {}]);
      }
      store.setValues({v1: 2});
      await pause(50, true);
      expect(await persistable.get(location)).toEqual([
        {t1: {r1: {c1: 2}}},
        {v1: 2},
      ]);
      if (persistable.getChanges) {
        expect(persistable.getChanges()).toEqual([{}, {v1: 2}]);
      }
      expect(persister.getStats()).toEqual({loads: 0, saves: 3});
    });

    test('autoSaves without race', async () => {
      if (name == 'file') {
        store.setTables({t1: {r1: {c1: 1}}});
        await persister.startAutoSave();
        expect(await persistable.get(location)).toEqual([
          {t1: {r1: {c1: 1}}},
          {},
        ]);
        expect(persister.getStats()).toEqual({loads: 0, saves: 1});
        store.setTables({t1: {r1: {c1: 2}}});
        store.setTables({t1: {r1: {c1: 3}}});
        await pause(50, true);
        expect(await persistable.get(location)).toEqual([
          {t1: {r1: {c1: 3}}},
          {},
        ]);
        expect(persister.getStats()).toEqual({loads: 0, saves: 3});
      }
    });

    test('loads', async () => {
      await persistable.set(location, [{t1: {r1: {c1: 1}}}, {v1: 1}]);
      await persister.load();
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      expect(store.getValues()).toEqual({v1: 1});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
    });

    test('loads backwards compatible', async () => {
      await persistable.set(location, [{t1: {r1: {c1: 1}}}] as any);
      await persister.load();
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
    });

    test('does not load from empty', async () => {
      store.setTables({t1: {r1: {c1: 1}}});
      await persister.load();
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
    });

    test('loads default when empty', async () => {
      store.setTables({t1: {r1: {c1: 1}}});
      await persister.load({t1: {r1: {c1: 2}}}, {v1: 1});
      expect(store.getTables()).toEqual({t1: {r1: {c1: 2}}});
      expect(store.getValues()).toEqual({v1: 1});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
    });

    test('does not load from corrupt', async () => {
      store.setTables({t1: {r1: {c1: 1}}});
      persistable.write(location, '{');
      await persister.load();
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
    });

    test('autoLoads', async () => {
      await persistable.set(location, [{t1: {r1: {c1: 1}}}, {}]);
      await persister.startAutoLoad();
      await nextLoop(true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      expect(persister.getStats()).toEqual({loads: 1, saves: 0});
      await persistable.set(location, [{t1: {r1: {c1: 2}}}, {}]);
      await pause(persistable.autoLoadPause, true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 2}}});
      expect(persister.getStats()).toEqual({loads: 2, saves: 0});
      await persistable.set(location, [{t1: {r1: {c1: 3}}}, {}]);
      await pause(persistable.autoLoadPause, true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 3}}});
      expect(persister.getStats()).toEqual({loads: 3, saves: 0});
      persister.stopAutoLoad();
      await persistable.set(location, [{t1: {r1: {c1: 4}}}, {}]);
      await pause(persistable.autoLoadPause, true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 3}}});
      expect(persister.getStats()).toEqual({loads: 3, saves: 0});
    });

    test('autoSave & autoLoad: no load when saving', async () => {
      if (name == 'file') {
        await persister.startAutoLoad({t1: {r1: {c1: 1}}});
        await persister.startAutoSave();
        await nextLoop(true);
        expect(persister.getStats()).toEqual({loads: 1, saves: 1});
        store.setTables({t1: {r1: {c1: 2}}});
        await nextLoop(true);
        expect(persister.getStats()).toEqual({loads: 1, saves: 2});
      }
    });

    test('autoSave & autoLoad: no save when loading', async () => {
      if (name == 'file') {
        await persister.startAutoLoad({t1: {r1: {c1: 1}}});
        await persister.startAutoSave();
        await nextLoop(true);
        expect(persister.getStats()).toEqual({loads: 1, saves: 1});
        await persistable.set(location, [{t1: {r1: {c1: 2}}}, {}]);
        await nextLoop(true);
        expect(persister.getStats()).toEqual({loads: 2, saves: 1});
      }
    });

    test('does not delete when autoLoaded is deleted', async () => {
      await persistable.set(location, [{t1: {r1: {c1: 1}}}, {}]);
      await persister.startAutoLoad({});
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      await persistable.del(location);
      await pause(persistable.autoLoadPause, true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
    });

    test('does not delete when autoLoaded is corrupted', async () => {
      await persistable.set(location, [{t1: {r1: {c1: 1}}}, {}]);
      await persister.startAutoLoad({});
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      persistable.write(location, '{');
      await pause(persistable.autoLoadPause, true);
      expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
    });

    test('does not load from non-existent', async () => {
      if (persistable.testMissing) {
        store.setTables({t1: {r1: {c1: 1}}});
        await persistable.getPersister(store, '_').load();
        expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      }
    });

    test('does not load from possibly invalid', async () => {
      if (name == 'file') {
        store.setTables({t1: {r1: {c1: 1}}});
        await persistable.getPersister(store, '.').load();
        expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      }
    });

    test('does not error on save to possibly invalid', async () => {
      if (name == 'file') {
        store.setTables({t1: {r1: {c1: 1}}});
        await persistable.getPersister(store, '.').save();
        expect(store.getTables()).toEqual({t1: {r1: {c1: 1}}});
      }
    });
  });
});