import yaml from 'js-yaml';
import * as fs from 'node:fs';
import path from 'node:path';

const parseFile = (filePath) => {
  const absFilePath = path.resolve(filePath);
  const str = fs.readFileSync(absFilePath, 'utf8');
  const type = path.extname(filePath);
  let parse;
  switch (type) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yaml':
    case '.yml':
      parse = yaml.load;
      break;
    default:
      parse = () => {};
  }
  return parse(str);
};

export default parseFile;
