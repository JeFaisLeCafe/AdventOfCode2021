const fs = require("fs");

// PART 1
// https://adventofcode.com/2021/day/2
fs.readFile("2_input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const arr = data.split("\n").map((instruction) => instruction.split(" "));
  // we now have an array like [["forward", "1"], ["up", "2"], ["down", "5"]]
  let depth = 0;
  let forward = 0;
  for (ins of arr) {
    switch (ins[0]) {
      case "forward":
        forward += parseInt(ins[1]);
        break;
      case "up":
        depth -= parseInt(ins[1]);
        break;
      case "down":
        depth += parseInt(ins[1]);
        break;
      default:
        console.log("ins fail ?", ins);
        break;
    }
  }
  console.log("depth 1", depth, "forw 1", forward);
  console.log("result 1 :", depth * forward);
});

// PART 2
// https://adventofcode.com/2021/day/2#part2
fs.readFile("2_input.txt", "utf-8", (err, data) => {
  if (err) throw err;
  const arr = data
    .split("\n")
    .map((instruction) =>
      instruction.split(" ").map((str) => (parseInt(str) ? parseInt(str) : str))
    );
  // we now have an array like [["forward", 1], ["up", 2], ["down", 5]]
  let depth = 0;
  let forward = 0;
  let aim = 0;
  for (ins of arr) {
    switch (ins[0]) {
      case "forward":
        forward += ins[1];
        depth += aim * ins[1];
        break;
      case "up":
        aim -= ins[1];
        break;
      case "down":
        aim += ins[1];
        break;
      default:
        console.log("ins fail ?", ins);
        break;
    }
  }
  console.log("depth 2", depth, "forw 2", forward);
  console.log("result 2 :", depth * forward);
});
