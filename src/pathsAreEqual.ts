export function pathsAreEqual(path: string, wildcardPath: string): boolean {
  const wildcardPathPieces = wildcardPath.split('.')
  const pathWithWildcards = path
    .split('.')
    .reduce<string[]>((carry, piece, index) => {
      const add = wildcardPathPieces[index] === '*' ? '*' : piece
      carry.push(add)
      return carry
    }, [])
    .join('.')
  return pathWithWildcards === wildcardPath
}
