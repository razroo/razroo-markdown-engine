require('dotenv').config();
import { readFileSync, writeFileSync } from 'fs';

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
