/**
 * Returns a random integer between a and b, inclusive
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function randIntBetweenInclusive(a, b) {
  return a + Math.floor(Math.random() * b);
}

/**
 * Choose/pick n random elements from some (integer-)indexable collection
 * @param {number} n
 * @param {Array<any>} something
 * @returns {Array<any>}
 */
function pickNRandomElementsFromSomething(n, something) {
  const indices = Array(something.length)
    .fill(0)
    .map((_, i) => i);
  for (let n = 0; n < 1_000; n++) {
    const i1 = randIntBetweenInclusive(0, indices.length);
    const i2 = randIntBetweenInclusive(0, indices.length);
    [indices[i1], indices[i2]] = [indices[i2], indices[i1]];
  }
  // NOTE
  // incindentally, a slice where n > indices.length is fine, 
  // as we'll just end up with a slice covering the entire array
  const randomElementsOfSomething = indices.slice(0, n >= indices.length ? indices.length : n).map((i) => something[i]);
  return randomElementsOfSomething;
}
