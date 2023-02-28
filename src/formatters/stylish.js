import _ from 'lodash';

const indentSymbol = ' ';
const lvlMult = 4;
const addSymbol = '+ ';
const deleteSymbol = '- ';
const constantSymbol = '  ';
const keyValueSeparator = ': ';
const nodeOpenSymbol = '{';
const nodeCloseSymbol = '}';

const getIndent = (lvl, statusSymbol = '') => indentSymbol
  .repeat(lvl * lvlMult - statusSymbol.length) + statusSymbol;

const stringifyData = (key, statusSymbol, data, lvl) => {
  if (_.isObject(data)) {
    const strObj = _.sortBy(Object.keys(data))
      .flatMap((subKey) => stringifyData(subKey, '', data[subKey], lvl + 1));
    return [
      getIndent(lvl, statusSymbol) + key + keyValueSeparator + nodeOpenSymbol,
      ...strObj,
      getIndent(lvl) + nodeCloseSymbol,
    ];
  }
  return getIndent(lvl, statusSymbol) + key + keyValueSeparator + data;
};

const stringifyDiffs = (innerDiffs, lvl) => {
  const result = _.flatMapDeep(innerDiffs, ({ key, status, data }) => {
    switch (status) {
      case 'added':
        return stringifyData(key, addSymbol, data, lvl);
      case 'deleted':
        return stringifyData(key, deleteSymbol, data, lvl);
      case 'constant':
        return stringifyData(key, constantSymbol, data, lvl);
      case 'modified':
        return [
          stringifyData(key, deleteSymbol, data[0], lvl),
          stringifyData(key, addSymbol, data[1], lvl),
        ];
      case 'node':
        return [
          getIndent(lvl) + key + keyValueSeparator + nodeOpenSymbol,
          stringifyDiffs(data, lvl + 1),
          getIndent(lvl) + nodeCloseSymbol,
        ];
      default:
        return [];
    }
  });
  return result;
};

export default (diffs) => {
  const result = `${nodeOpenSymbol}\n${stringifyDiffs(diffs, 1)
    .join('\n')}\n${nodeCloseSymbol}`;
  return result;
};
