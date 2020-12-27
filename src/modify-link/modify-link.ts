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

export function removeCurlyBraces(match: any) {
  return match.replace('{{ ', '').replace(' }}', '');
}

export function modifyGithubLink(match: any) {
  return match.replace('/blob', '').replace('github.com', 'raw.githubusercontent.com');
}
