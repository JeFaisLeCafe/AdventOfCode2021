const fs = require("fs");
// https://adventofcode.com/2021/day/1
// PART 1
fs.readFile("1_input.txt", "utf8", (err, data) => {
  if (err) throw err;
  let c = 0;
  const arr = data.split("\n").map((str) => parseInt(str));
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      c++;
    }
  }
  console.log("c=", c);
  return c;
});

// https://adventofcode.com/2021/day/1#part2
// PART 2
fs.readFile("1_input.txt", "utf8", (err, data) => {
  if (err) throw err;
  let c = 0;
  const arr = data.split("\n").map((str) => parseInt(str));
  for (let i = 1; i < arr.length - 2; i++) {
    const a = arr[i - 1] + arr[i] + arr[i + 1];
    const b = arr[i] + arr[i + 1] + arr[i + 2];
    if (b > a) {
      c++;
    }
  }
  console.log("c2=", c);
  return c;
});
