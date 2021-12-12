// PART 1 https://adventofcode.com/2021/day/3
const fs = require("fs");

fs.readFile("3_input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const arr = data.split("\n");
  let gamma = []; // the most
  let epsilon = []; // the opposite in binary

  for (let i = 0; i < arr[0].length; i++) {
    // we go bit by bit...
    let count = { 0: 0, 1: 0 };
    for (n of arr) {
      // ... across the entire file
      parseInt(n[i]) === 0 ? (count["0"] += 1) : (count["1"] += 1);
    }
    if (count["0"] > count["1"]) {
      gamma.push(0);
      epsilon.push(1);
    } else {
      gamma.push(1);
      epsilon.push(0);
    }
  }
  const formattedGamma = gamma.join(""); // is a string
  const formattedEpsilon = epsilon.join(""); // is a string
  const decGamma = parseInt(formattedGamma, 2);
  const decEpsilon = parseInt(formattedEpsilon, 2);
  console.log(
    "gamma",
    formattedGamma,
    decGamma,
    "espilon",
    formattedEpsilon,
    decEpsilon
  );
  console.log("RESULT 1: ", decEpsilon * decGamma);
});

// PART 2 https://adventofcode.com/2021/day/3#part2
// giving up
