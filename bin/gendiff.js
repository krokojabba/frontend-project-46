#!/usr/bin/env node
const { program } = require('commander');

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.');

program.parse();

console.log('Hellow world!');
