let fsPromises = require("fs/promises");
const input = require("./d1input.txt");
async function main() {
  const data = await fsPromises.readFile(input);
  console.log(data);
}

main();
