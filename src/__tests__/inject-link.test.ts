import {readFileSync, writeFileSync} from "fs";
import remark = require("remark");
import embeddedCodeSnippets from "@razroo/razroo-remark-embed-code";
import removeTitleTags from '@razroo/razroo-remark-netlify';
const mkdirp = require('mkdirp');
const variables = require('remark-variables');
require('dotenv').config();

test('Testing remark parsing', () => {
  const fileToBeBuilt = `src/__tests__/fixtures/inject-link.md`;
  const builtFilePath = './build/inject-link.md';
  const data = {
    section: 'article123'
  }
  mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
  testCodeInjection(fileToBeBuilt, builtFilePath, data).then(output => {
    expect(output).toEqual('123');
  });

});

function testCodeInjection(fileToBeBuilt: string, outputFilePath: string, data: any) {
  let markdownAsString = readFileSync(fileToBeBuilt).toString();

  return new Promise(async(resolve, reject) => {
    return remark()
      .use(removeTitleTags)
      .use(variables)
      .use(await embeddedCodeSnippets, {
        github: 'https://github.com',
        githubApi: 'https://api.github.com',
        username: 'razroo',
        token: `${process.env.GITHUB_TOKEN}`,
      })
      .data('var', data)
      .process(markdownAsString, async(err, file) => {
        resolve([writeFileSync(outputFilePath, file.contents), console.log(outputFilePath)]);
        reject(err)
      });
  });
}
