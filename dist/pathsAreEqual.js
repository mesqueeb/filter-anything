export function pathsAreEqual(path, wildcardPath) {
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
