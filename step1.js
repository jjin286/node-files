"use strict";

const fsP = require("fs/promises");
const argv = process.argv;

/** Takes a file path and shows it's file contents */
async function cat(path){
  let content;

  try{
    content = await fsP.readFile(`${[path]}`, "utf8");
  }
  catch(err){
    console.log("Error:", err);
    process.exit(1);
  }

  console.log(content);
}

cat(argv[2]);
