let fs = require("fs");
require("./d1input.txt");

const data = fs
  .readFileSync("./d1input.txt", "utf-8")
  .split(/\n\n/)
  .map((x) => x.split(/\n/))
  .map((x) => {
    return x.reduce((acc, x) => {
      acc += Number.parseInt(x);
      return acc;
    }, 0);
  })
  .sort((a, b) => b - a);
console.log("Part-1:", data[0]);
console.log("Part-2:", data[0] + data[1] + data[2]);
