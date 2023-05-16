let arr = [1, 2, 5, 7];

let mappedArr = arr.map(item => item * item)

console.log('Original arr:', arr);
console.log('Mapped arr:', mappedArr);

let filteredArr = arr.filter(item => item < 0);

console.log('Original arr:', arr);
console.log('filteredArr arr:', filteredArr);

let reducedArr = arr.reduce((acc, cur) => {
  console.log('Accumulator', acc, 'Current value', cur)
  return  cur + acc;
}, 0)

console.log('Original arr:', arr);
console.log('Reduced arr:', reducedArr);