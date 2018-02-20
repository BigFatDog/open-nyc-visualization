function toArray(arraylike) {
  const array = new Array(arraylike.length);
  for (let i = 0, n = arraylike.length; i < n; i++) array[i] = arraylike[i];
  return array;
}

export default toArray;
