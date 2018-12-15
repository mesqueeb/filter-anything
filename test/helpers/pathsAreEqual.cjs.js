'use strict';

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

module.exports = pathsAreEqual;
