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
 * Returns a new object with only the props passed as fillables
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [fillables=[]] an array of strings, with the props which should be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
function fillable(obj, fillables) {
    // @ts-ignore
    if (!fillables.length)
        return {};
    // @ts-ignore
    return recursiveFilter(obj, fillables, []);
}
/**
 * Returns a new object without guarded props
 *
 * @export
 * @param {object} obj the target object to check
 * @param {string[]} [guarded=[]] an array of strings, with the props which should NOT be allowed on returned object
 * @returns {AnyObject} the cleaned object after deleting guard and non-fillables
 */
function guard(obj, guarded) {
    // @ts-ignore
    return recursiveFilter(obj, [], guarded);
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

export { fillable, guard };
