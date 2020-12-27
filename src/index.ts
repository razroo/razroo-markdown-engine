require('dotenv').config()
const micromatch = require("micromatch");
const url = import("url");
import axios from 'axios';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
const argv = yargs(hideBin(process.argv)).argv;
import {readFileSync, writeFileSync} from 'fs';
const authenticatedAxios = axios.create({
  headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
})
async function replaceSnippets(fileAsArray: any) {
  // glob matching pattern
  let match = micromatch(fileAsArray, ["*{{**}}*"]);
  let promises = [];

  for (const x in match) {
    let promise = new Promise(async (resolve, reject) => {
      // remove the braces
      let indexOfCode = fileAsArray.indexOf(match[x]);
      match[x] = match[x].replace("{{ ", "");
      match[x] = match[x].replace(" }}", "");

      // we need to work with raw content from github
      match[x] = match[x].replace("/blob", "");
      match[x] = match[x].replace("github.com", "raw.githubusercontent.com");

      //   get the line numbers
      let lineNumbers = url.parse(match[x]).hash;

      //   remove the Ls and #
      lineNumbers = lineNumbers.replace("L", "");
      lineNumbers = lineNumbers.replace("L", "");
      lineNumbers = lineNumbers.replace("#", "");
      lineNumbers = lineNumbers.split("-");

      //   get the github raw content
      await authenticatedAxios
        .get(match[x])
        .then((response: any) => {
          // handle success
          let fileArray = response.data.split("\n");
          let codeSnippet = fileArray.slice(lineNumbers[0] - 1, lineNumbers[1]);
          codeSnippet.unshift("```");
          codeSnippet.push("```");
          fileAsArray[indexOfCode] = codeSnippet.join("\n");
          resolve(codeSnippet);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    promises.push(promise);
  }
  return await Promise.all(promises).then((v) => {
    return fileAsArray;
  });
}

exports.resolveMarkdownFile = (inputFilePath: any, outputFilePath: any) => {
  return new Promise((resolve, reject) => {
    replaceSnippets(readFileSync(inputFilePath, "utf8").split("\n"))
      .then((newFileArray) => {
        writeFileSync(outputFilePath, newFileArray.join("\n"));
        resolve(outputFilePath);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
