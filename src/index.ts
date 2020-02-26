import { O } from 'ts-toolbelt'
import { recursiveFilter } from './recursiveFilter'

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
export function pick<T extends object, K extends string> (obj: T, keys: K[]): O.Pick<T, K> {
  // @ts-ignore
  if (!keys.length) return {}
  // @ts-ignore
  return recursiveFilter(obj, keys, [])
}

export const fillable = pick

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
export function omit<T extends object, K extends string> (obj: T, keys: K[]): O.Omit<T, K> {
  // @ts-ignore
  return recursiveFilter(obj, [], keys)
}

export const guard = omit

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
