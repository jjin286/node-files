"use strict";

const fsP = require("fs/promises");
const argv = process.argv;

/**Controller function that determines whether to write to file or console log */
async function controller() {
  let result;
  if (argv[2] === "--out") {
    result = await determineCat(argv[4]);
    writeToFile(result, argv[3]);
  } else {
    result = await determineCat(argv[2]);
    console.log(result);
  }
}

/**Writes the content given into a new File called NewFileName*/
async function writeToFile(content, newFileName) {
  try {
    await fsP.writeFile(`${newFileName}`, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

/** Takes a file path and shows it's file contents or return
 * an error
 */
async function cat(path) {
  let content;

  try {
    content = await fsP.readFile(`${path}`, "utf8");
  }
  catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
  return content;
}

/**Takes a URL and returns it's html contents or errors*/
async function webCat(url) {
  let response;
  try {
    response = await fetch(url);
  }
  catch (err) {
    console.log("error", err);
    process.exit(1);
  }
  return await response.text();
}

/**Determine whether a URL or a file path was passed in. */
async function determineCat(pathOrUrl) {
  try {
    new URL(pathOrUrl);
  }
  catch {
    return await cat(pathOrUrl);
  }
  return await webCat(pathOrUrl);
}
controller();