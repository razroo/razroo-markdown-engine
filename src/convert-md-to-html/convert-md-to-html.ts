import remark from "remark";
import variables from 'remark-variables';
import html from 'remark-html';
import removeTitleTagsPlugin from '@razroo/razroo-remark-netlify';
import slug from 'remark-slug';
import remarkPrism from 'remark-prism';
import headings from 'remark-autolink-headings';

export function convertMdToHtml(markdownString: string): any {
    return new Promise(async(resolve, reject) => {
        return remark()
          .use(removeTitleTagsPlugin)
          .use(variables)
          .use(slug)
          // Note that this module must be included after `remark-slug`.
          .use(headings)
          .use(remarkPrism as any)
          .use(html)
          .data('var', markdownString)
          .process(markdownString, (err, file) => {
            resolve(file?.contents)
            reject(err)
          });
      });
}