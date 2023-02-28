import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diffs, type) => {
  let format;
  switch (type) {
    case 'stylish':
      format = stylish;
      break;
    case 'plain':
      format = plain;
      break;
    case 'json':
      format = json;
      break;
    default:
  }

  return format(diffs);
};
