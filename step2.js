"use strict";

const fsP = require("fs/promises");
const argv = process.argv;

/** Takes a file path and shows it's file contents or return
 * an error
 */
async function cat(path){
  try{
    let contents = await fsP.readFile(`${[path]}`, "utf8");
    console.log(contents);
  }
  catch(err){
    console.log("Error:", err);
    process.exit(1);
  }
}

/**Takes a URL and shows it's html contents or errors*/
async function webCat(url){
  try{
    const response = await fetch(url);

    console.log("response", await response.text());
  }
  catch(err){
    console.log("error", err);
    process.exit(1);
  }

}

/**Determine whether a URL or a file path was passed in. */
function determineCat(pathOrUrl){
  try{
    new URL(pathOrUrl);
    webCat(pathOrUrl);
  }
  catch{
    cat(pathOrUrl);
  }
}

determineCat(argv[2]);

