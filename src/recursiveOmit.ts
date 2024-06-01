import { isPlainObject } from 'is-what'
import { pathsAreEqual } from './pathsAreEqual.js'

export function recursiveOmit<T extends { [key in string]: unknown }, OmittedKeys extends string[]>(
  obj: T,
  omittedKeys: OmittedKeys,
  pathUntilNow = '',
): T {
  if (!isPlainObject(obj)) {
    return obj
  }
  return Object.entries(obj).reduce<{ [key in string]: unknown }>((carry, [key, value]) => {
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
    carry[key] = recursiveOmit(obj[key] as any, omittedKeys, path)
    return carry
  }, {}) as T
}
