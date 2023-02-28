import * as fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.resolve(`__fixtures__/${filename}`);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let filePath1;
let filePath2;
let stylishDiff;
let plainDiff;
let jsonDiff;

beforeAll(() => {
  filePath1 = '__fixtures__/file1.json';
  filePath2 = '__fixtures__/file2.yaml';
  stylishDiff = readFile('stylishDiff.txt');
  plainDiff = readFile('plainDiff.txt');
  jsonDiff = readFile('jsonDiff.json');
});

test('diff test', () => {
  expect(genDiff(filePath1, filePath2)).toBe(stylishDiff);
  expect(genDiff(filePath1, filePath2, 'plain')).toBe(plainDiff);
  expect(genDiff(filePath1, filePath2, 'json')).toBe(jsonDiff);
});
