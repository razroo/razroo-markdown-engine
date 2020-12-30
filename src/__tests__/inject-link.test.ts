import {testCodeInjection} from "../index";
const mkdirp = require('mkdirp')

test('Testing remark parsing', () => {
  const fileToBeBuilt = `src/__tests__/fixtures/inject-link.md`;
  const builtFilePath = './build/inject-link.md';
  mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
  let match = testCodeInjection(fileToBeBuilt, builtFilePath);

  expect(match).toEqual('123');
});
