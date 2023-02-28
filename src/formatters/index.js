import stylish from './stylish.js';
import plain from './plain.js';

const defaultFormatter = (diffs) => JSON.stringify(diffs, null, '  ');

export default (diffs, type) => {
  let format;
  switch (type) {
    case 'stylish':
      format = stylish;
      break;
    case 'plain':
      format = plain;
      break;
    default:
      format = defaultFormatter;
  }

  return format(diffs);
};
