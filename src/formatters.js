import _ from 'lodash';

const stylish = (diffs) => {
  const indentSymbol = ' ';
  const lvlMult = 4;
  const addSymbol = '+ ';
  const deleteSymbol = '- ';
  const constantSymbol = '  ';
  const keyValueSeparator = ': ';
  const nodeOpenSymbol = '{';
  const nodeCloseSymbol = '}';

  const getIndent = (lvl, statusSymbol = '') => {
    const result = indentSymbol.repeat(lvl * lvlMult - statusSymbol.length) + statusSymbol;
    return result;
  };

  const stringifyData = (key, statusSymbol, data, lvl) => {
    let strs;
    if (_.isObject(data)) {
      const strObj = Object.keys(data)
        .sort()
        .flatMap((subKey) => stringifyData(subKey, '', data[subKey], lvl + 1));
      strs = [
        getIndent(lvl, statusSymbol) + key + keyValueSeparator + nodeOpenSymbol,
        ...strObj,
        getIndent(lvl) + nodeCloseSymbol,
      ];
    } else {
      strs = getIndent(lvl, statusSymbol) + key + keyValueSeparator + data;
    }
    return strs;
  };

  const stringifyDiffs = (innerDiffs, lvl) => {
    const result = _.flatMapDeep(innerDiffs, ({ key, status, data }) => {
      let diffStrings;

      switch (status) {
        case 'added':
          diffStrings = stringifyData(key, addSymbol, data, lvl);
          break;
        case 'deleted':
          diffStrings = stringifyData(key, deleteSymbol, data, lvl);
          break;
        case 'constant':
          diffStrings = stringifyData(key, constantSymbol, data, lvl);
          break;
        case 'modified':
          diffStrings = [
            stringifyData(key, deleteSymbol, data[0], lvl),
            stringifyData(key, addSymbol, data[1], lvl),
          ];
          break;
        case 'node':
          diffStrings = [
            getIndent(lvl) + key + keyValueSeparator + nodeOpenSymbol,
            stringifyDiffs(data, lvl + 1),
            getIndent(lvl) + nodeCloseSymbol,
          ];
          break;
        default:
          diffStrings = [];
          break;
      }
      return diffStrings;
    });
    return result;
  };
  // console.log(innerFunc(diffs, 0));
  return `${nodeOpenSymbol}\n${stringifyDiffs(diffs, 1)
    .map((str) => str.trimEnd())
    .join('\n')}\n${nodeCloseSymbol}`;
};

/* ; */

const defaultFormatter = (diffs) => JSON.stringify(diffs, null, '  ');

export default (diffs, type) => {
  let formatter;
  switch (type) {
    case 'stylish':
      formatter = stylish;
      break;
    default:
      formatter = defaultFormatter;
  }

  return formatter(diffs);
};
