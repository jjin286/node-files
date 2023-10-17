"use strict";

const fsP = require("fs/promises");
const argv = process.argv;

/** Takes a file path and shows it's file contents */
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

cat(argv[2]);
