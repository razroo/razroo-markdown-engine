import {matchInjectedLinks, testCodeInjection} from "../inject-link/inject-link";
import {readFileSync} from "fs";

test('Should return markdown files with appropriate curly braces', () => {
  const fileToBeBuilt = `src/__tests__/fixtures/inject-link.md`;
  let match = matchInjectedLinks(readFileSync(fileToBeBuilt, 'utf8'));

  expect(match.length).toEqual(1);
});

test('Testing remark parsing', () => {
  const fileToBeBuilt = `src/__tests__/fixtures/inject-link.md`;
  let match = testCodeInjection(readFileSync(fileToBeBuilt).toString());

  expect(match).toEqual('123');
});

test('Should NOT return any markdown being that there are no curly braces', () => {
  const fileToBeBuilt = `src/__tests__/fixtures/inject-link-noop.md`;
  let match = matchInjectedLinks(readFileSync(fileToBeBuilt, 'utf8'));

  expect(match.length).toEqual(0);
});
