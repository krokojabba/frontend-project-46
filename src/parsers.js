import yaml from 'js-yaml';
import * as fs from 'node:fs';
import path from 'node:path';

const getParser = (type) => {
  switch (type) {
    case '.json':
      return JSON.parse;
    case '.yaml':
    case '.yml':
      return yaml.load;
    default:
      throw new Error(`Format ${type} - is incorrect`);
  }
};

const parseFile = (filePath) => {
  const absFilePath = path.resolve(filePath);
  const str = fs.readFileSync(absFilePath, 'utf8');
  const type = path.extname(filePath);
  const parse = getParser(type);
  return parse(str);
};

export default parseFile;
