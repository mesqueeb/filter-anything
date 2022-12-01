import { isPlainObject } from 'is-what'
import pathsAreEqual from './pathsAreEqual.js'

export function recursiveOmit<T extends Record<string, any>, OmittedKeys extends string[]>(
  obj: T,
  omittedKeys: OmittedKeys,
  pathUntilNow = ''
): T {
  if (!isPlainObject(obj)) {
    return obj
  }
  return Object.entries(obj).reduce<Record<string, any>>((carry, [key, value]) => {
    let path = pathUntilNow
    if (path) path += '.'
    path += key
    if (omittedKeys.some((guardPath) => pathsAreEqual(path, guardPath))) {
      return carry
    }
    // no further recursion needed
    if (!isPlainObject(value)) {
      carry[key] = value
      return carry
    }
    carry[key] = recursiveOmit(obj[key], omittedKeys, path)
    return carry
  }, {}) as T
}
