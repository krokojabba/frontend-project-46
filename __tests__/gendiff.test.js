import * as fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.resolve(`__fixtures__/${filename}`);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let filePath1;
let filePath2;
let diff1;

beforeAll(() => {
  filePath1 = '__fixtures__/file1.json';
  filePath2 = '__fixtures__/file2.yaml';
  diff1 = readFile('diff1.txt');
});

test('diff test', () => {
  expect(genDiff(filePath1, filePath2)).toBe(diff1);
});
