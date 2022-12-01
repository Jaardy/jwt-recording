let fsPromises = require("fs/promises");
require("./d1input.txt");
async function parseData() {
  const data = await fsPromises.readFile("./d1input.txt", "utf-8");
  let dataParsed = data.split(/\n\n/).map((x) => x.split(/\n/));

  return dataParsed;
}

parseData();

async function main() {
  const data = await parseData();
  const elfTotals = data.map((x) => {
    x.reduce((acc, x) => {
      console.log(acc);
      acc += x;
      return acc;
    }, 0);
  });

  console.log(elfTotals);
}

main();
