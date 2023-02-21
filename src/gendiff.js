import _ from 'lodash';
import parseFile from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parseFile(filepath1);
  //  console.log(obj1);

  const obj2 = parseFile(filepath2);
  //  console.log(obj2);

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
