let fsPromises = require("fs/promises");
require("./d1input.txt");
async function main() {
  const data = await fsPromises.readFile("./d1input.txt");
  console.log(data);
}

main();
