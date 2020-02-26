import { O } from 'ts-toolbelt';
/**
 * pick returns a new object with only the props you pick
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj the target object to pick props from
 * @param {K[]} keys the prop names you want to keep
 * @returns {O.Pick<T, K>} a new object with just the picked props
 */
export declare function pick<T extends object, K extends string>(obj: T, keys: K[]): O.Pick<T, K>;
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
export declare function omit<T extends object, K extends string>(obj: T, keys: K[]): O.Omit<T, K>;
export declare const guard: typeof omit;
