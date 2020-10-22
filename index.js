#!/usr/bin/env node

/*
  Examples to get list files and folders
  nls
  nls ../
*/

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
// const util = require("util");

const targetDir = process.argv[2] || process.cwd();

const { lstat } = fs.promises;
// const lstat = util.promisify(fs.lstat) // Promisify a method

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises); // order is preserved regardless of what is resolved first

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.magenta(filenames[index]));
    } else {
      console.log(chalk.cyan(filenames[index]));
    }
  }
});
