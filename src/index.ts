import remark = require("remark");
import embeddedCodeSnippets from "@razroo/razroo-remark-embed-code";
const remarkInclude = require('@karuga/remark-include');
const variables = require('remark-variables');
const remarkParse = require('remark-parse');
require('dotenv').config();

import { readFileSync, writeFileSync } from 'fs';

exports.resolveMarkdownFile = (fileToBeBuilt: string, outputFilePath: string, data: any) => {
  let markdownAsString = readFileSync(fileToBeBuilt).toString();

  return new Promise(async(resolve, reject) => {
    return remark()
      .use(variables)
      .use(await embeddedCodeSnippets, {
        github: 'https://github.com',
        githubApi: 'https://api.github.com',
        username: 'razroo',
        token: `${process.env.GITHUB_TOKEN}`,
      })
      .use(remarkParse)
      .use(remarkInclude, { cwd: __dirname, glob: true, escaped: true })
      .data('var', data)
      .process(markdownAsString, (err, file) => {
        resolve([writeFileSync(outputFilePath, file.contents), console.log(outputFilePath)]);
        reject(err)
      });
  });
};
