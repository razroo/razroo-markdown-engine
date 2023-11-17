import remark = require("remark");
const variables = require('remark-variables');
import html = require('remark-html');
import removeTitleTagsPlugin from '@razroo/razroo-remark-netlify';
const slug = require('remark-slug');
const remarkPrism = require('remark-prism');
const headings = require('remark-autolink-headings');


export function convertMdToHtml(markdownString: string): any {
    return new Promise(async(resolve, reject) => {
        return remark()
          .use(removeTitleTagsPlugin)
          .use(variables)
          .use(slug)
          // Note that this module must be included after `remark-slug`.
          .use(headings)
          .use(remarkPrism)
          .use(html)
          .data('var', markdownString)
          .process(markdownString, (err, file) => {
            resolve(file?.contents)
            reject(err)
          });
      });
}