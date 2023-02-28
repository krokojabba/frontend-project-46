import * as fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/gendiff.js';

const getFixturePath = (filename) => path.resolve(`__fixtures__/${filename}`);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('diff test', () => {
  const filePath1 = '__fixtures__/file1.json';
  const filePath2 = '__fixtures__/file2.yaml';
  const stylishDiff = readFile('stylishDiff.txt');
  const plainDiff = readFile('plainDiff.txt');
  const jsonDiff = readFile('jsonDiff.json');
  expect(genDiff(filePath1, filePath2)).toBe(stylishDiff);
  expect(genDiff(filePath1, filePath2, 'plain')).toBe(plainDiff);
  expect(genDiff(filePath1, filePath2, 'json')).toBe(jsonDiff);
});
