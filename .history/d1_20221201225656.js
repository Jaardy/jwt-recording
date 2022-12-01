let fsPromises = require("fs/promises");
require("./d1input.txt");
async function parseData() {
  const data = await fsPromises.readFile("./d1input.txt", "utf-8");
  let dataParsed = data.split(/\n\n/).map((x) => x.split(/\n/));

  return dataParsed;
}

async function main() {
  const data = await parseData();
  const elfTotals = data.map((x) => {
    return x.reduce((acc, x) => {
      acc += Number.parseInt(x);
      return acc;
    }, 0);
  });
  elfTotals.pop();
  elfTotals.sort((a, b) => b - a);
  console.table("Part-1:", elfTotals[0]);
  console.table("Part-1:", elfTotals[0] + elfTotals[1] + elfTotals[2]);
}

main();
