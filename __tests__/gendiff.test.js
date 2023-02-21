import * as fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

let filePath1;
let filePath2;
let filePathEmpty;
let filePathDiff1;
let filePathDiff2;
let filePathDiff3;
let yamlFIlePath1;
let yamlFIlePath2;

beforeAll(() => {
  filePath1 = '__tests__/__fixtures__/file1.json';
  filePath2 = '__tests__/__fixtures__/file2.json';
  filePathEmpty = '__tests__/__fixtures__/empty.json';

  yamlFIlePath1 = '__tests__/__fixtures__/file1.yaml';
  yamlFIlePath2 = '__tests__/__fixtures__/file2.yml';

  filePathDiff1 = '__tests__/__fixtures__/diff1.txt';
  filePathDiff2 = '__tests__/__fixtures__/diff2.txt';
  filePathDiff3 = '__tests__/__fixtures__/diff3.txt';
});

test('diff test', () => {
  const diff1 = fs.readFileSync(path.resolve(filePathDiff1), 'utf8');
  expect(genDiff(filePath1, filePath2)).toBe(diff1);

  const diff2 = fs.readFileSync(path.resolve(filePathDiff2), 'utf8');
  expect(genDiff(filePath1, filePath1)).toBe(diff2);

  const diff3 = fs.readFileSync(path.resolve(filePathDiff3), 'utf8');
  expect(genDiff(filePath1, filePathEmpty)).toBe(diff3);

  const diff4 = '{\n  \n}';
  expect(genDiff(filePathEmpty, filePathEmpty)).toBe(diff4);

  expect(genDiff(yamlFIlePath1, yamlFIlePath2)).toBe(diff1);

  expect(genDiff(filePath1, yamlFIlePath1)).toBe(diff2);
});
