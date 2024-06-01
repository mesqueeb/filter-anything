import { isPlainObject } from 'is-what'
import { pathsAreEqual } from './pathsAreEqual.js'

export function recursivePick<T extends { [key in string]: unknown }, PickedKeys extends string[]>(
  obj: T,
  pickedKeys: PickedKeys,
  pathUntilNow = '',
): T {
  if (!isPlainObject(obj)) {
    return obj
  }
  return Object.entries(obj).reduce<{ [key in string]: unknown }>((carry, [key, value]) => {
    let path = pathUntilNow
    if (path) path += '.'
    path += key
    // check pickedKeys up to this point
    if (pickedKeys.length) {
      let passed = false
      pickedKeys.forEach((pickedKey) => {
        const pathDepth = path.split('.').length
        const pickedKeyDepth = pickedKey.split('.').length
        const pickedKeyUpToNow = pickedKey.split('.').slice(0, pathDepth).join('.')
        const pathUpToPickedKeyDepth = path.split('.').slice(0, pickedKeyDepth).join('.')
        if (pathsAreEqual(pathUpToPickedKeyDepth, pickedKeyUpToNow)) passed = true
      })
      // there's not one pickedKey that allows up to now
      if (!passed) return carry
    }
    // no further recursion needed
    if (!isPlainObject(value)) {
      carry[key] = value
      return carry
    }
    carry[key] = recursivePick(obj[key] as any, pickedKeys, path)
    return carry
  }, {}) as T
}
