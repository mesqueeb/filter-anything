import { O, S, F, U } from 'ts-toolbelt';
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
export declare function pick<T extends Record<string, any>, K extends string>(obj: T, keys: F.AutoPath<T, K>[]): U.Merge<O.P.Pick<T, S.Split<K, '.'>>>;
export declare const fillable: typeof pick;
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
export declare function omit<T extends Record<string, any>, K extends string>(obj: T, keys: F.AutoPath<T, K>[]): U.Merge<O.P.Omit<T, S.Split<K, '.'>>>;
export declare const guard: typeof omit;
