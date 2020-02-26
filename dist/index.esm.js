import { isPlainObject } from 'is-what';

function pathsAreEqual(path, wildcardPath) {
    var wildcardPathPieces = wildcardPath.split('.');
    var pathWithWildcards = path
        .split('.')
        .reduce(function (carry, piece, index) {
        var add = wildcardPathPieces[index] === '*' ? '*' : piece;
        carry.push(add);
        return carry;
    }, [])
        .join('.');
    return pathWithWildcards === wildcardPath;
}

function recursiveFilter(obj, fillables, guarded, pathUntilNow) {
    if (pathUntilNow === void 0) { pathUntilNow = ''; }
    if (!isPlainObject(obj)) {
        return obj;
    }
    // @ts-ignore
    return Object.keys(obj).reduce(function (carry, key) {
        var path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        // check guard regardless
        if (guarded.some(function (guardPath) { return pathsAreEqual(path, guardPath); })) {
            return carry;
        }
        var value = obj[key];
        // check fillables up to this point
        if (fillables.length) {
            var passed_1 = false;
            fillables.forEach(function (fillable) {
                var pathDepth = path.split('.').length;
                var fillableDepth = fillable.split('.').length;
                var fillableUpToNow = fillable
                    .split('.')
                    .slice(0, pathDepth)
                    .join('.');
                var pathUpToFillableDepth = path
                    .split('.')
                    .slice(0, fillableDepth)
                    .join('.');
                if (pathsAreEqual(pathUpToFillableDepth, fillableUpToNow))
                    passed_1 = true;
            });
            // there's not one fillable that allows up to now
            if (!passed_1)
                return carry;
        }
        // no fillables or fillables up to now allow it
        if (!isPlainObject(value)) {
            carry[key] = value;
            return carry;
        }
        carry[key] = recursiveFilter(obj[key], fillables, guarded, path);
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
 * @param {K[]} keys the prop names you want to keep
 * @returns {O.Pick<T, K>} a new object with just the picked props
 */
function pick(obj, keys) {
    // @ts-ignore
    if (!keys.length)
        return {};
    // @ts-ignore
    return recursiveFilter(obj, keys, []);
}
var fillable = pick;
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
    // @ts-ignore
    return recursiveFilter(obj, [], keys);
}
var guard = omit;
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

export { fillable, guard, omit, pick };
