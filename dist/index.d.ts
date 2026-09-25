import { F, O, S, U } from 'ts-toolbelt';
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
export declare function pick<T extends {
    [key in string]: unknown;
}, K extends string>(obj: T, keys: F.AutoPath<T, K>[]): U.Merge<O.P.Pick<T, S.Split<K, '.'>>>;
export declare const fillable: typeof pick;
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
export declare function omit<T extends {
    [key in string]: unknown;
}, K extends string>(obj: T, keys: F.AutoPath<T, K>[]): U.Merge<O.P.Omit<T, S.Split<K, '.'>>>;
export declare const guard: typeof omit;
