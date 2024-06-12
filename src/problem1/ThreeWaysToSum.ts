

// https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
// mathematical formula
// O(1) time complexity
function sumToMathematical(n: number): number {
  if (n <= 0) {
    return 0;
  }

  return (n * (n + 1)) / 2;
}

// a more efficient mathematical formula
// by dividing first 
// O(1) time complexity
function sumToMathematicalDivideFirst(n: number) {
  if (n % 2 == 0) return (n / 2) * (n + 1);
  // If n is odd, (n+1) must be even
  else return ((n + 1) / 2) * n;
} 



// Arithmetic Progression 
// O(1) time complexity
// essentially the same as the mathematical formula
function sumToUsingAP(n: number): number {
  let first = 1, last = n;
  let terms = last - first + 1;
  let average = (first + last) / 2;
  return average * terms;
}


// recursive
// O(n) time complexity
// DOES NOT WORK WELL FOR LARGE NUMBERS
// Included for completeness
function sumToNRecursive(n: number): number {
  if (n <= 0) {
    return 0;
  }

  return n + sumToNRecursive(n - 1);
}

// iterative
// O(n) time complexity
// DOES NOT WORK WELL FOR LARGE NUMBERS
// Included for completeness
function sumToNIterative(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}


// DRIVER CODE
const NUMBER_TO_TEST = Number.MAX_SAFE_INTEGER;
console.log(sumToMathematical(NUMBER_TO_TEST));
console.log(sumToMathematicalDivideFirst(NUMBER_TO_TEST));
console.log(sumToUsingAP(NUMBER_TO_TEST));