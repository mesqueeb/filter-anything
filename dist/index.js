import { isPlainObject, isFullArray } from 'is-what';

function pathsAreEqual(path, wildcardPath) {
  const wildcardPathPieces = wildcardPath.split(".");
  const pathWithWildcards = path.split(".").reduce((carry, piece, index) => {
    const add = wildcardPathPieces[index] === "*" ? "*" : piece;
    carry.push(add);
    return carry;
  }, []).join(".");
  return pathWithWildcards === wildcardPath;
}

function recursiveOmit(obj, omittedKeys, pathUntilNow = "") {
  if (!isPlainObject(obj)) {
    return obj;
  }
  return Object.entries(obj).reduce((carry, [key, value]) => {
    let path = pathUntilNow;
    if (path)
      path += ".";
    path += key;
    if (omittedKeys.some((guardPath) => pathsAreEqual(path, guardPath))) {
      return carry;
    }
    if (!isPlainObject(value)) {
      carry[key] = value;
      return carry;
    }
    carry[key] = recursiveOmit(obj[key], omittedKeys, path);
    return carry;
  }, {});
}

function recursivePick(obj, pickedKeys, pathUntilNow = "") {
  if (!isPlainObject(obj)) {
    return obj;
  }
  return Object.entries(obj).reduce((carry, [key, value]) => {
    let path = pathUntilNow;
    if (path)
      path += ".";
    path += key;
    if (pickedKeys.length) {
      let passed = false;
      pickedKeys.forEach((pickedKey) => {
        const pathDepth = path.split(".").length;
        const pickedKeyDepth = pickedKey.split(".").length;
        const pickedKeyUpToNow = pickedKey.split(".").slice(0, pathDepth).join(".");
        const pathUpToPickedKeyDepth = path.split(".").slice(0, pickedKeyDepth).join(".");
        if (pathsAreEqual(pathUpToPickedKeyDepth, pickedKeyUpToNow))
          passed = true;
      });
      if (!passed)
        return carry;
    }
    if (!isPlainObject(value)) {
      carry[key] = value;
      return carry;
    }
    carry[key] = recursivePick(obj[key], pickedKeys, path);
    return carry;
  }, {});
}

function pick(obj, keys) {
  if (!isFullArray(keys))
    return {};
  return recursivePick(obj, keys);
}
const fillable = pick;
function omit(obj, keys) {
  if (!isFullArray(keys))
    return obj;
  return recursiveOmit(obj, keys);
}
const guard = omit;

export { fillable, guard, omit, pick };
