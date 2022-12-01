let fsPromises = require("fs/promises");
require("./d1input.txt");
async function main() {
  const data = await fsPromises.readFile("./d1input.txt", "utf-8");
  let dataParsed = data.split(/\n\n/).map((x) => x.split(/\n/));

  return dataParse;
}

main();
