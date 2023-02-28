import _ from 'lodash';
import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';

const innerDiff = (object1, object2) => {
  const unionKey = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const diffs = unionKey.map((key) => {
    if (!Object.hasOwn(object1, key)) {
      return { key, status: 'added', data: object2[key] };
    }
    if (!Object.hasOwn(object2, key)) {
      return { key, status: 'deleted', data: object1[key] };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, status: 'node', data: innerDiff(object1[key], object2[key]) };
    }
    if (object1[key] === object2[key]) {
      return { key, status: 'constant', data: object1[key] };
    }
    return { key, status: 'modified', data: [object1[key], object2[key]] };
  });
  return diffs;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const diffs = innerDiff(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diffs);
};

export default genDiff;
