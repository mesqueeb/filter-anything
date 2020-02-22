import { O } from 'ts-toolbelt'
import { recursiveFilter } from './recursiveFilter'

/**
 * Returns a new object with only the props passed as fillables
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [fillables=[]] an array of strings, with the props which should be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
export function fillable<T extends object, K extends string> (
  obj: T,
  fillables: K[]
): O.Pick<T, K> {
  // @ts-ignore
  if (!fillables.length) return {}
  // @ts-ignore
  return recursiveFilter(obj, fillables, [])
}

/**
 * Returns a new object without guarded props
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [guarded=[]] an array of strings, with the props which should NOT be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
export function guard<T extends object, K extends string> (obj: T, guarded: K[]): O.Omit<T, K> {
  // @ts-ignore
  return recursiveFilter(obj, [], guarded)
}

// /**
//  * Returns a new object but with only the props passed as fillables and/or without guarded props
//  *
//  * @export
//  * @param {object} obj the target object to check
//  * @param {string[]} fillables array of strings, with the props which should be allowed on returned object
//  * @param {string[]} [guarded=[]] an array of strings, with the props which should NOT be allowed on returned object
//  * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
//  */
// export function filter<
//   T extends object,
//   KeyToKeep extends string,
//   KeyToDelete extends string,
//   KeysToKeep extends KeyToKeep[],
//   KeysToDelete extends KeyToDelete[]
// > (
//   obj: T,
//   fillables: KeysToKeep,
//   guarded?: KeysToDelete
// ) {
//   // @ts-ignore
//   return recursiveFilter(obj, fillables, guarded)
// }
