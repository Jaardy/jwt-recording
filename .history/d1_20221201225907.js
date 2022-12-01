let fs = require("fs");
require("./d1input.txt");
function parseData() {
  const data = fs.readFileSync("./d1input.txt", "utf-8");
  let dataParsed = data.split(/\n\n/).map((x) => x.split(/\n/));

  return dataParsed;
}

function main() {
  const data = parseData();
  const elfTotals = data.map((x) => {
    return x.reduce((acc, x) => {
      acc += Number.parseInt(x);
      return acc;
    }, 0);
  });
  elfTotals.pop();
  elfTotals.sort((a, b) => b - a);
  console.log("Part-1:", elfTotals[0]);
  console.log("Part-2:", elfTotals[0] + elfTotals[1] + elfTotals[2]);
}

main();
