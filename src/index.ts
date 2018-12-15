import { isPlainObject } from 'is-what'
import pathsAreEqual from './pathsAreEqual'

type AnyObject = {[key: string]: any}

function recursiveFilter (
  obj: object,
  fillables: string[],
  guard: string[],
  pathUntilNow: string = ''
): AnyObject {
  if (!isPlainObject(obj)) {
    console.log('obj → ', obj)
    return obj
  }
  return Object.keys(obj).reduce((carry, key) => {
    let path = pathUntilNow
    if (path) path += '.'
    path += key
    // check guard regardless
    if (guard.some(guardPath => pathsAreEqual(path, guardPath))) {
      return carry
    }
    const value = obj[key]
    // check fillables up to this point
    if (fillables.length) {
      let passed = false
      fillables.forEach(fillable => {
        const pathDepth = path.split('.').length
        const fillableDepth = fillable.split('.').length
        const fillableUpToNow = fillable.split('.').slice(0, pathDepth).join('.')
        const pathUpToFillableDepth = path.split('.').slice(0, fillableDepth).join('.')
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
    carry[key] = recursiveFilter(obj[key], fillables, guard, path)
    return carry
  }, {})
}

/**
 * Checks all props of an object and deletes guarded and non-fillables.
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [fillables=[]] an array of strings, with the props which should be allowed on returned object
 * @param {string[]} [guard=[]] an array of strings, with the props which should NOT be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
export default function (
  obj: object,
  fillables: string[] = [],
  guard: string[] = []
): AnyObject {
  return recursiveFilter(obj, fillables, guard)
}
