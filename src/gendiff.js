import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');

const parseToObj = (str, type) => {
  switch (type) {
    case '.json':
      return JSON.parse(str);
    default:
      return {};
  }
};

const genDiff = (filepath1, filepath2, options) => {
  const absFilePath1 = path.resolve(filepath1);
  const file1Type = path.extname(absFilePath1);
  const str1 = readFile(absFilePath1);
  const obj1 = parseToObj(str1, file1Type);

  const absFilePath2 = path.resolve(filepath2);
  const file2Type = path.extname(absFilePath2);
  const str2 = readFile(absFilePath2);
  const obj2 = parseToObj(str2, file2Type);

  const unionKey = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const diffs = unionKey.flatMap((key) => {
    let status; //deleted, added, modified, constant

    if (!Object.hasOwn(obj1, key)) status = 'added';
    else if (!Object.hasOwn(obj2, key)) status = 'deleted';
    else if (obj1[key] === obj2[key]) status = 'constant';
    else status = 'modified';

    switch (status) {
      case 'added':
        return `+ ${key}: ${obj2[key]}`;
      case 'deleted':
        return `- ${key}: ${obj1[key]}`;
      case 'constant':
        return `  ${key}: ${obj1[key]}`;
      case 'modified':
        return [`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`];
    }
  });
  return `{ \n  ${diffs.join('\n  ')}\n}`;
};

export default genDiff;
