#!/usr/bin/env node
import genDiff from '../src/gendiff.js';
import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options));
  });

program.parse();
