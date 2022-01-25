import { isPlainObject, isFullArray } from 'is-what';

function pathsAreEqual(path, wildcardPath) {
    const wildcardPathPieces = wildcardPath.split('.');
    const pathWithWildcards = path
        .split('.')
        .reduce((carry, piece, index) => {
        const add = wildcardPathPieces[index] === '*' ? '*' : piece;
        carry.push(add);
        return carry;
    }, [])
        .join('.');
    return pathWithWildcards === wildcardPath;
}

function recursiveOmit(obj, omittedKeys, pathUntilNow = '') {
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

function recursivePick(obj, pickedKeys, pathUntilNow = '') {
    if (!isPlainObject(obj)) {
        return obj;
    }
    return Object.entries(obj).reduce((carry, [key, value]) => {
        let path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        // check pickedKeys up to this point
        if (pickedKeys.length) {
            let passed = false;
            pickedKeys.forEach((pickedKey) => {
                const pathDepth = path.split('.').length;
                const pickedKeyDepth = pickedKey.split('.').length;
                const pickedKeyUpToNow = pickedKey.split('.').slice(0, pathDepth).join('.');
                const pathUpToPickedKeyDepth = path.split('.').slice(0, pickedKeyDepth).join('.');
                if (pathsAreEqual(pathUpToPickedKeyDepth, pickedKeyUpToNow))
                    passed = true;
            });
            // there's not one pickedKey that allows up to now
            if (!passed)
                return carry;
        }
        // no further recursion needed
        if (!isPlainObject(value)) {
            carry[key] = value;
            return carry;
        }
        carry[key] = recursivePick(obj[key], pickedKeys, path);
        return carry;
    }, {});
}

/**
 * pick returns a new object with only the props you pick
 *
 * @export
 * @template T
 * @template K
 * @param {T} obj the target object to pick props from
 * @param {K[]} keys an array of prop names you want to keep - allows dot-notation for nested props, eg. `nested.prop` will keep just `{ nested: { prop: 1 } }`
 * @returns {O.Pick<T, K>} a new object with just the picked props
 */
function pick(obj, keys) {
    if (!isFullArray(keys))
        return {};
    return recursivePick(obj, keys);
}
const fillable = pick;
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
function omit(obj, keys) {
    if (!isFullArray(keys))
        return obj;
    return recursiveOmit(obj, keys);
}
const guard = omit;

export { fillable, guard, omit, pick };
