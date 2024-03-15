import {Hash, HashStamp, Stamp, Time} from '../types/mergeable-store';
import {IdMap, mapNew, mapToObj} from '../common/map';
import {IdObj, objNew} from '../common/obj';
import {EMPTY_STRING} from '../common/strings';
import {Id} from '../types/common';
import {getHash} from './hash';

const cloneHashStamp = <Value>([
  time,
  value,
  hash,
]: HashStamp<Value>): HashStamp<Value> => [time, value, hash];

export const stampNew = <Thing>(time: Time, thing?: Thing): Stamp<Thing> => [
  time,
  thing as Thing,
];

export const hashIdAndHash = (id: Id, hash: Hash) => getHash(id + ':' + hash);

export const updateHashStamp = (
  hashStamp: HashStamp<unknown>,
  hash: Hash,
  time: Time,
) => {
  hashStamp[2] = hash >>> 0;
  if (time > hashStamp[0]) {
    hashStamp[0] = time;
  }
};

export const stampNewObj = <Thing>(time: Time): Stamp<IdObj<Thing>> =>
  stampNew(time, objNew<Thing>());

export const hashStampNewMap = <Thing>(
  time = EMPTY_STRING,
): HashStamp<IdMap<Thing>> => [time, mapNew<Id, Thing>(), 0];

export const hashStampNewThing = <Thing>(): HashStamp<Thing> => [
  EMPTY_STRING,
  undefined as any,
  0,
];

export const hashStampMap = <From, To = From>(
  [time, value, hash]: HashStamp<From>,
  mapper: (value: From, time: Time) => To,
): HashStamp<To> => [time, mapper(value, time), hash];

export const hashStampMapToObj = <From, To = From>(
  hashStamp: HashStamp<IdMap<From>>,
  mapper: (mapValue: From) => To = cloneHashStamp as any,
): HashStamp<IdObj<To>> =>
  hashStampMap(hashStamp, (map) => mapToObj(map, mapper));
