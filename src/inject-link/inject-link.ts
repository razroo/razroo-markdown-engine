const url = require('url');
const micromatch = require('micromatch');
import remark = require("remark");
import embeddedCodeSnippets from '@razroo/razroo-remark-embed-code';
const report = 'vfile-reporter';
require('dotenv').config();

export function removeLsandHashtags(match: any) {
    //   get the line numbers
    let lineNumbers = url.parse(match).hash;

    //   remove the Ls and #
    lineNumbers = lineNumbers.replace('L', '');
    lineNumbers = lineNumbers.replace('L', '');
    lineNumbers = lineNumbers.replace('#', '');
    lineNumbers = lineNumbers.split('-');

    return lineNumbers;
}

export function matchInjectedLinks(fileAsArray: string): string[] {
  return micromatch(fileAsArray, ['*{{**}}*']);
}

export function testCodeInjection(markdownAsString: string) {
  remark()
    .use(embeddedCodeSnippets, {
        github: 'https://github.com',
        githubApi: 'https://api.github.com',
        username: 'razroo',
        token: `${process.env.GITHUB_TOKEN}`,
    })
    .process(markdownAsString, (err, file) => {
        console.log(String(file));
    });
}


export function removeCurlyBraces(match: any) {
  return match.replace('{{ ', '').replace(' }}', '');
}

export function modifyGithubLink(match: any) {
  return match.replace('/blob', '').replace('github.com', 'raw.githubusercontent.com');
}
