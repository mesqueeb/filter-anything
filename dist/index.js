import { isFullArray } from 'is-what';
import { recursiveOmit } from './recursiveOmit.js';
import { recursivePick } from './recursivePick.js';
/**
 * pick returns a new object with only the props you pick
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj the target object to pick props from
 * @param {K[]} keys an array of prop names you want to keep - allows dot-notation for nested props, eg. `nested.prop` will keep just `{ nested: { prop: 1 } }`
 * @returns {O.Pick<T, K>} a new object with just the picked props
 */
export function pick(obj, keys) {
    if (!isFullArray(keys))
        return {};
    return recursivePick(obj, keys);
}
export const fillable = pick;
/**
 * omit returns a new object without the props you omit
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj the target object to omit props from
 * @param {K[]} keys the prop names you want to omit
 * @returns {O.Omit<T, K>} a new object without the omitted props
 */
export function omit(obj, keys) {
    if (!isFullArray(keys))
        return obj;
    return recursiveOmit(obj, keys);
}
export const guard = omit;
