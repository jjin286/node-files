"use strict";

const fsP = require("fs/promises");
const argv = process.argv;


/** Takes a file path and shows it's file contents or return
 * an error
 */
async function cat(path) {
  let content;

  try {
    content = await fsP.readFile(`${[path]}`, "utf8");
  }
  catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }

  console.log(content);
}
/**Takes a URL and shows it's html contents or errors*/
async function webCat(url) {
  let response;
  try {
    response = await fetch(url);
  }
  catch (err) {
    console.log("error", err);
    process.exit(1);
  }
  console.log("response", await response.text());
}

/**Determine whether a URL or a file path was passed in. */
function determineCat(pathOrUrl) {
  try {
    new URL(pathOrUrl);
    webCat(pathOrUrl);
  }
  catch {
    cat(pathOrUrl);
  }
}

determineCat(argv[2]);

