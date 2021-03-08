'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isWhat = require('is-what');

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

function recursiveOmit(obj, omittedKeys, pathUntilNow) {
    if (pathUntilNow === void 0) { pathUntilNow = ''; }
    if (!isWhat.isPlainObject(obj)) {
        return obj;
    }
    return Object.entries(obj).reduce(function (carry, _a) {
        var key = _a[0], value = _a[1];
        var path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        if (omittedKeys.some(function (guardPath) { return pathsAreEqual(path, guardPath); })) {
            return carry;
        }
        // no further recursion needed
        if (!isWhat.isPlainObject(value)) {
            carry[key] = value;
            return carry;
        }
        carry[key] = recursiveOmit(obj[key], omittedKeys, path);
        return carry;
    }, {});
}

function recursivePick(obj, pickedKeys, pathUntilNow) {
    if (pathUntilNow === void 0) { pathUntilNow = ''; }
    if (!isWhat.isPlainObject(obj)) {
        return obj;
    }
    return Object.entries(obj).reduce(function (carry, _a) {
        var key = _a[0], value = _a[1];
        var path = pathUntilNow;
        if (path)
            path += '.';
        path += key;
        // check pickedKeys up to this point
        if (pickedKeys.length) {
            var passed_1 = false;
            pickedKeys.forEach(function (pickedKey) {
                var pathDepth = path.split('.').length;
                var pickedKeyDepth = pickedKey.split('.').length;
                var pickedKeyUpToNow = pickedKey.split('.').slice(0, pathDepth).join('.');
                var pathUpToPickedKeyDepth = path.split('.').slice(0, pickedKeyDepth).join('.');
                if (pathsAreEqual(pathUpToPickedKeyDepth, pickedKeyUpToNow))
                    passed_1 = true;
            });
            // there's not one pickedKey that allows up to now
            if (!passed_1)
                return carry;
        }
        // no further recursion needed
        if (!isWhat.isPlainObject(value)) {
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
    // @ts-ignore
    if (!keys.length)
        return {};
    // @ts-ignore
    return recursivePick(obj, keys);
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
    return recursiveOmit(obj, keys);
}
var guard = omit;

exports.fillable = fillable;
exports.guard = guard;
exports.omit = omit;
exports.pick = pick;
