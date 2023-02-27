import _ from 'lodash';
import parseFile from './parsers.js';
import format from './formatters.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const generateDiff = (object1, object2) => {
    const unionKey = _.union(Object.keys(object1), Object.keys(object2)).sort();
    const diffs = unionKey.map((key) => {
      let status;
      let data;

      if (!Object.hasOwn(object1, key)) {
        status = 'added';
        data = object2[key];
      } else if (!Object.hasOwn(object2, key)) {
        status = 'deleted';
        data = object1[key];
      } else if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        status = 'node';
        data = generateDiff(object1[key], object2[key]);
      } else if (object1[key] === object2[key]) {
        status = 'constant';
        data = object1[key];
      } else {
        status = 'modified';
        data = [object1[key], object2[key]];
      }

      return { key, status, data };
    });
    return diffs;
  };

  const obj1 = parseFile(filepath1);

  const obj2 = parseFile(filepath2);

  const diffs = generateDiff(obj1, obj2);

  // console.log(JSON.stringify(diffs, null, '  '));
  // return `{\n  ${diffs.join('\n  ')}\n}`;
  return format(diffs, formatter);
};

export default genDiff;
