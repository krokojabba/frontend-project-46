import * as fs from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const readFile = (filepath) => {
  const absFilePath = path.resolve(filepath);
  return fs.readFileSync(absFilePath, 'utf8');
};

const parseToObj = (str, type) => {
  switch (type) {
    case '.json':
      return JSON.parse(str);
    default:
      return {};
  }
};

const genDiff = (filepath1, filepath2) => {
  //  const absFilePath1 = path.resolve(filepath1);
  //  const file1Type = path.extname(absFilePath1);
  const str1 = readFile(filepath1);
  const obj1 = parseToObj(str1, path.extname(filepath1));

  //  const absFilePath2 = path.resolve(filepath2);
  //  const file2Type = path.extname(absFilePath2);
  const str2 = readFile(filepath2);
  const obj2 = parseToObj(str2, path.extname(filepath2));

  const unionKey = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const diffs = unionKey.flatMap((key) => {
    let status; // deleted, added, modified, constant

    if (!Object.hasOwn(obj1, key)) status = 'added';
    else if (!Object.hasOwn(obj2, key)) status = 'deleted';
    else if (obj1[key] === obj2[key]) status = 'constant';
    else status = 'modified';
    let result;

    switch (status) {
      case 'added':
        result = `+ ${key}: ${obj2[key]}`;
        break;
      case 'deleted':
        result = `- ${key}: ${obj1[key]}`;
        break;
      case 'constant':
        result = `  ${key}: ${obj1[key]}`;
        break;
      case 'modified':
        result = [`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`];
        break;
      default:
    }
    return result;
  });
  return `{\n  ${diffs.join('\n  ')}\n}`;
};

export default genDiff;
