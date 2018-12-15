'use strict';

var isWhat = require('is-what');

function pathsAreEqual (path, wildcardPath) {
    var wildcardPathPieces = wildcardPath.split('.');
    var pathWithWildcards = path.split('.')
        .reduce(function (carry, piece, index) {
        var add = (wildcardPathPieces[index] === '*') ? '*' : piece;
        carry.push(add);
        return carry;
    }, []).join('.');
    return (pathWithWildcards === wildcardPath);
}

function recursiveFilter(obj, fillables, guard, pathUntilNow) {
    if (pathUntilNow === void 0) { pathUntilNow = ''; }
    if (!isWhat.isPlainObject(obj)) {
        console.log('obj → ', obj);
        return obj;
    }
    return Object.keys(obj).reduce(function (carry, key) {
        var path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        // check guard regardless
        if (guard.some(function (guardPath) { return pathsAreEqual(path, guardPath); })) {
            return carry;
        }
        var value = obj[key];
        // check fillables up to this point
        if (fillables.length) {
            var passed_1 = false;
            fillables.forEach(function (fillable) {
                var pathDepth = path.split('.').length;
                var fillableDepth = fillable.split('.').length;
                var fillableUpToNow = fillable.split('.').slice(0, pathDepth).join('.');
                var pathUpToFillableDepth = path.split('.').slice(0, fillableDepth).join('.');
                if (pathsAreEqual(pathUpToFillableDepth, fillableUpToNow))
                    passed_1 = true;
            });
            // there's not one fillable that allows up to now
            if (!passed_1)
                return carry;
        }
        // no fillables or fillables up to now allow it
        if (!isWhat.isPlainObject(value)) {
            carry[key] = value;
            return carry;
        }
        carry[key] = recursiveFilter(obj[key], fillables, guard, path);
        return carry;
    }, {});
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
function index (obj, fillables, guard) {
    if (fillables === void 0) { fillables = []; }
    if (guard === void 0) { guard = []; }
    return recursiveFilter(obj, fillables, guard);
}

module.exports = index;
