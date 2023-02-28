import _ from 'lodash';

const strData = (data) => {
  if (_.isObject(data)) return '[complex value]';
  if (_.isString(data)) return `'${data}'`;
  return data;
};

const stringifyDiffs = (innerDiffs, path) => _.flatMapDeep(innerDiffs, ({ key, status, data }) => {
  const newPath = [...path, key];
  const startString = `Property '${newPath.join('.')}' was`;
  switch (status) {
    case 'added':
      return `${startString} added with value: ${strData(data)}`;
    case 'deleted':
      return `${startString} removed`;
    case 'modified':
      return `${startString} updated. From ${strData(data[0])} to ${strData(data[1])}`;
    case 'node':
      return stringifyDiffs(data, newPath);
    case 'constant':
    default:
      return [];
  }
});

export default (diffs) => stringifyDiffs(diffs, []).join('\n');
