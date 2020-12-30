import remark = require("remark");
import embeddedCodeSnippets from "@razroo/razroo-remark-embed-code";
require('dotenv').config();

import { readFileSync, writeFileSync } from 'fs';

exports.resolveMarkdownFile = (fileToBeBuilt: string, outputFilePath: string) => {
  let markdownAsString = readFileSync(fileToBeBuilt).toString();

  return new Promise((resolve, reject) => {
    remark()
      .use(embeddedCodeSnippets, {
        github: 'https://github.com',
        githubApi: 'https://api.github.com',
        username: 'razroo',
        token: `${process.env.GITHUB_TOKEN}`,
      })
      .process(markdownAsString, (err, file) => {
        resolve(writeFileSync(outputFilePath, file.contents));
      });
  });
};
