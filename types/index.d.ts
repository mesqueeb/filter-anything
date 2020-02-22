import { O } from 'ts-toolbelt';
/**
 * Returns a new object with only the props passed as fillables
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [fillables=[]] an array of strings, with the props which should be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
export declare function fillable<T extends object, K extends string>(obj: T, fillables: K[]): O.Pick<T, K>;
/**
 * Returns a new object without guarded props
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [guarded=[]] an array of strings, with the props which should NOT be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
export declare function guard<T extends object, K extends string>(obj: T, guarded: K[]): O.Omit<T, K>;
