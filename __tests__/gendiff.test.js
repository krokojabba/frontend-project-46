import * as fs from 'node:fs';
import genDiff from '../src/gendiff.js';

let filePath1;
let filePath2;
let filePathEmpty;
let filePathDiff1;
let filePathDiff2;
let filePathDiff3;

beforeAll(() => {
  filePath1 = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/file1.json';
  filePath2 = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/file2.json';
  filePathEmpty = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/empty.json';
  filePathDiff1 = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/diff1.txt';
  filePathDiff2 = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/diff2.txt';
  filePathDiff3 = '/mnt/c/Code/frontend-project-46/__tests__/__fixtures__/diff3.txt';
});

test('diff test', () => {
  const diff1 = fs.readFileSync(filePathDiff1, 'utf8');
  expect(genDiff(filePath1, filePath2)).toBe(diff1);

  const diff2 = fs.readFileSync(filePathDiff2, 'utf8');
  expect(genDiff(filePath1, filePath1)).toBe(diff2);

  const diff3 = fs.readFileSync(filePathDiff3, 'utf8');
  expect(genDiff(filePath1, filePathEmpty)).toBe(diff3);

  const diff4 = '{\n  \n}';
  expect(genDiff(filePathEmpty, filePathEmpty)).toBe(diff4);
});
