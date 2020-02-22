import { isPlainObject } from 'is-what'
import pathsAreEqual from './pathsAreEqual'

export function recursiveFilter<
  T extends object,
  KeysToKeep extends string[],
  KeysToDelete extends string[]
> (obj: T, fillables: KeysToKeep, guarded: KeysToDelete, pathUntilNow = ''): T {
  if (!isPlainObject(obj)) {
    return obj
  }
  // @ts-ignore
  return Object.keys(obj).reduce((carry, key) => {
    let path = pathUntilNow
    if (path) path += '.'
    path += key
    // check guard regardless
    if (guarded.some(guardPath => pathsAreEqual(path, guardPath))) {
      return carry
    }
    const value = obj[key]
    // check fillables up to this point
    if (fillables.length) {
      let passed = false
      fillables.forEach(fillable => {
        const pathDepth = path.split('.').length
        const fillableDepth = fillable.split('.').length
        const fillableUpToNow = fillable
          .split('.')
          .slice(0, pathDepth)
          .join('.')
        const pathUpToFillableDepth = path
          .split('.')
          .slice(0, fillableDepth)
          .join('.')
        if (pathsAreEqual(pathUpToFillableDepth, fillableUpToNow)) passed = true
      })
      // there's not one fillable that allows up to now
      if (!passed) return carry
    }
    // no fillables or fillables up to now allow it
    if (!isPlainObject(value)) {
      carry[key] = value
      return carry
    }
    carry[key] = recursiveFilter(obj[key], fillables, guarded, path)
    return carry
  }, {})
}
