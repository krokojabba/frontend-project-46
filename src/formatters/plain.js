import _ from 'lodash';

const strData = (data) => {
  let result;
  if (_.isObject(data)) result = '[complex value]';
  else if (_.isString(data)) result = `'${data}'`;
  else result = data;
  return result;
};

const stringifyDiffs = (innerDiffs, path) => {
  const result = _.flatMapDeep(innerDiffs, ({ key, status, data }) => {
    path.push(key);
    let diffStrings = `Property '${path.join('.')}' was`;

    switch (status) {
      case 'added':
        diffStrings = `${diffStrings} added with value: ${strData(data)}`;
        break;
      case 'deleted':
        diffStrings = `${diffStrings} removed`;
        break;
      case 'constant':
        diffStrings = [];
        break;
      case 'modified':
        diffStrings = `${diffStrings} updated. From ${strData(data[0])} to ${strData(data[1])}`;
        break;
      case 'node':
        diffStrings = stringifyDiffs(data, path);
        break;
      default:
        diffStrings = [];
        break;
    }
    path.pop();
    return diffStrings;
  });
  return result;
};

export default (diffs) => stringifyDiffs(diffs, []).join('\n');
