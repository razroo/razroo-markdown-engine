import remark = require("remark");
import embeddedCodeSnippets from '@razroo/razroo-remark-embed-code';
require('dotenv').config();

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
