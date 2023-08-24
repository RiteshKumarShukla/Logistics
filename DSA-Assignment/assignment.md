### Problem 1: Am I Perfect?

**Question:**
Write a function that tells if a given number is perfect or not. A number is called perfect if the sum of the factors of a number (excluding the number itself) is the number itself.

Output:

- Return "Perfect" if the number is perfect.
- If the sum of factors is greater than the input, return "Abundant".
- If the sum of factors is lesser than the input, return "Deficient".

**Example:**

1. `6` -> factors(1, 2, 3) -> sum (1 + 2 + 3) = 6 (perfect number)
2. `12` -> factors(1, 2, 3, 4, 6) -> sum(1 + 2 + 3 + 4 + 6) = 16 > 12 (Abundant)
3. `8` -> factors(1, 2, 4) -> sum(1 + 2 + 4) = 7 < 8 (Deficient)

**Solution:**

```javascript
function checkNumberType(number) {
  let sumOfFactors = 0;

  for (let i = 1; i <= number / 2; i++) {
    if (number % i === 0) {
      sumOfFactors += i;
    }
  }

  if (sumOfFactors === number) {
    return "Perfect";
  } else if (sumOfFactors > number) {
    return "Abundant";
  } else {
    return "Deficient";
  }
}

console.log(checkNumberType(6)); // Output: Perfect
console.log(checkNumberType(12)); // Output: Abundant
console.log(checkNumberType(8)); // Output: Deficient
```

### Problem 2: Shorten me!

**Question:**
Implement two functions. The first function shortens a string of values by replacing consecutive data elements with just one data value and count of the consecutive values. The second function takes the shortened string and gives back the original value.

For simplicity, you can assume that the unencoded string will only contain the letters A through Z (either lower or upper case) and whitespace. This way data to be encoded will never contain any numbers and numbers inside data to be decoded always represent the count for the following character.

**Example:**

1. `"AAAAAAAAAAABWWWWWWWWWWWBB"` -> `"11AB11W2B"`
2. `"11AB11W2B"` -> `"AAAAAAAAAAABWWWWWWWWWWWBB"`

**Solution:**

```javascript
function shortenString(inputString) {
  let shortened = "";
  let count = 1;

  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === inputString[i + 1]) {
      count++;
    } else {
      if (count > 1) {
        shortened += count;
      }
      shortened += inputString[i];
      count = 1;
    }
  }

  return shortened;
}

function expandShortenedString(shortenedString) {
  let expanded = "";
  let count = "";

  for (let char of shortenedString) {
    if (!isNaN(char)) {
      count += char;
    } else {
      if (count === "") {
        expanded += char;
      } else {
        expanded += char.repeat(Number(count));
        count = "";
      }
    }
  }

  return expanded;
}

const input = "AAAAAAAAAAABWWWWWWWWWWWBB";
const shortenedInput = shortenString(input);
console.log(shortenedInput); // Output: "11AB11W2B"
console.log(expandShortenedString(shortenedInput)); // Output: "AAAAAAAAAAABWWWWWWWWWWWBB"
```

### Problem 3: How many trails to 1?

**Question:**
Given a positive integer `x`, if `x` is even, divide `x` by 2 to get `x / 2`. If `x` is odd, multiply `x` by 3 and add 1 to get `3x + 1`. Repeat the process indefinitely. No matter which number you start with, you will always reach 1 eventually during the process. Given a number `x`, return the number of steps required to reach 1.

**Examples:**
Starting with `x = 12`, the steps would be as follows:

- 12 - even (divide by 2)
- 6 - even (divide by 2)
- 3 - odd (3 \* 3 + 1)
- 10 - even (divide by 2)
- 5 - odd (3 \* 5 + 1)
- 16 - even (divide by 2)
- 8 - even (divide by 2)
- 4 - even (divide by 2)
- 2 - even (divide by 2)
- 1 - stop

We got to 1 in 9 steps. So for input `x = 12`, the return value would be 9.

**Solution:**

```javascript
function countStepsToReachOne(startingNumber) {
  let steps = 0;

  while (startingNumber !== 1) {
    if (startingNumber % 2 === 0) {
      startingNumber /= 2;
    } else {
      startingNumber = 3 * startingNumber + 1;
    }
    steps++;
  }

  return steps;
}

console.log(countStepsToReachOne(12)); // Output: 9
```

### Problem 4: Greater than and less than in a matrix

**Question:**
Detect values in a matrix that are greater than or equal to every element in their row and less than or equal to every element in their column.

**Example:**
Matrix:

```
1  2  3
7  8  7
5  4  2
8  6  7
```

Value at row 2, column 1: `5` (It's greater than or equal to every element in row 2 and less than or equal to every element in column 1)

**Solution:**

```javascript
function findSpecialValues(matrix) {
  const specialValues = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const currentValue = matrix[row][col];
      const maxInRow = Math.max(...matrix[row]);
      const minInColumn = Math.min(...matrix.map((row) => row[col]));

      if (currentValue >= maxInRow && currentValue <= minInColumn) {
        specialValues.push(currentValue);
      }
    }
  }

  return specialValues;
}

const matrix = [
  [7, 8, 7],
  [5, 4, 2],
  [8, 6, 7],
];
console.log(findSpecialValues(matrix)); // Output: [5]
```
