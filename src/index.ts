import remark = require("remark");
import embeddedCodeSnippets from "@razroo/razroo-remark-embed-code";
const variables = require('remark-variables');
require('dotenv').config();
import { readFileSync, writeFileSync } from 'fs';
import html = require('remark-html');
import removeTitleTagsPlugin from '@razroo/razroo-remark-netlify';
const slug = require('remark-slug')
const headings = require('remark-autolink-headings');

exports.resolveMarkdownFile = (fileToBeBuilt: string, outputFilePath: string, data: any) => {
  let markdownAsString = readFileSync(fileToBeBuilt).toString();

  return new Promise(async(resolve, reject) => {
    return remark()
      .use(removeTitleTagsPlugin)
      .use(variables)
      .use(await embeddedCodeSnippets, {
        github: 'https://github.com',
        githubApi: 'https://api.github.com',
        username: 'razroo',
        token: `${process.env.GITHUB_TOKEN}`,
      })
      .use(slug)
      // Note that this module must be included after `remark-slug`.
      .use(headings)
      .use(require('remark-prism'))
      .use(html)
      .data('var', data)
      .process(markdownAsString, (err, file) => {
        resolve([writeFileSync(outputFilePath, file.contents), console.log(outputFilePath)]);
        reject(err)
      });
  });
};
