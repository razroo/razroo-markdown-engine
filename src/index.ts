require('dotenv').config();
const micromatch = require('micromatch');
const url = require('url');
import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import {modifyGithubLink, removeCurlyBraces, removeLsandHashtags} from "./modify-link/modify-link";

const authenticatedAxios = axios.create({
  headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
});
async function replaceSnippets(fileAsArray: any) {
  // glob matching pattern
  let match = micromatch(fileAsArray, ['*{{**}}*']);
  let promises = [];

  for (const x in match) {
    const promise = new Promise(async (resolve, reject) => {
      // remove the braces
      const indexOfCode = fileAsArray.indexOf(match[x]);
      match[x] = removeCurlyBraces(match[x]);
      // we need to work with raw content from github
      match[x] = modifyGithubLink(match[x]);

      //   get the line numbers
      let lineNumbers = removeLsandHashtags(match[x]);

      //   get the github raw content
      await authenticatedAxios
        .get(match[x])
        .then((response: any) => {
          // handle success
          let fileArray = response.data.split('\n');
          let codeSnippet = fileArray.slice(lineNumbers[0] - 1, lineNumbers[1]);
          codeSnippet.unshift('```');
          codeSnippet.push('```');
          fileAsArray[indexOfCode] = codeSnippet.join('\n');
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
    replaceSnippets(readFileSync(inputFilePath, 'utf8').split('\n'))
      .then((newFileArray) => {
        writeFileSync(outputFilePath, newFileArray.join('\n'));
        resolve(outputFilePath);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
