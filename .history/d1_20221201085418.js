let fsPromises = require("fs/promises");
require("./d1input.txt");
async function main() {
  const data = await fsPromises.readFile("./d1input.txt", "utf-8");
  const re = /.+/g;
  const dataParsed = data.match(re);
  console.log(dataParsed);
  return data;
}

main();
