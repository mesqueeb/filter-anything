import { isFullArray } from 'is-what';
import { recursiveOmit } from './recursiveOmit.js';
import { recursivePick } from './recursivePick.js';
/**
 * Pick returns a new object with only the props you pick
 *
 * @template T
 * @template K
 * @param {T} obj The target object to pick props from
 * @param {K[]} keys An array of prop names you want to keep - allows dot-notation for nested props,
 *   eg. `nested.prop` will keep just `{ nested: { prop: 1 } }`
 * @returns {O.Pick<T, K>} A new object with just the picked props
 * @export
 */
export function pick(obj, keys) {
    if (!isFullArray(keys))
        return {};
    return recursivePick(obj, keys);
}
export const fillable = pick;
/**
 * Omit returns a new object without the props you omit
 *
 * @template T
 * @template K
 * @param {T} obj The target object to omit props from
 * @param {K[]} keys The prop names you want to omit
 * @returns {O.Omit<T, K>} A new object without the omitted props
 * @export
 */
export function omit(obj, keys) {
    if (!isFullArray(keys))
        return obj;
    return recursiveOmit(obj, keys);
}
export const guard = omit;
