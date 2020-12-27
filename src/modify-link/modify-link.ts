const url = require('url');

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
