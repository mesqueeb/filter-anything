import { isPlainObject } from 'is-what';
import { pathsAreEqual } from './pathsAreEqual.js';
export function recursiveOmit(obj, omittedKeys, pathUntilNow = '') {
    if (!isPlainObject(obj)) {
        return obj;
    }
    return Object.entries(obj).reduce((carry, [key, value]) => {
        let path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        if (omittedKeys.some((guardPath) => pathsAreEqual(path, guardPath))) {
            return carry;
        }
        // no further recursion needed
        if (!isPlainObject(value)) {
            carry[key] = value;
            return carry;
        }
        carry[key] = recursiveOmit(obj[key], omittedKeys, path);
        return carry;
    }, {});
}
