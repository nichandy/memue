const fse = require('fs-extra');
const unified = require('unified');
const parse = require('remark-parse');
const example = require('./01_example');
const stringify = require('remark-stringify');
const frontmatter = require('remark-frontmatter');
const vfile = require('to-vfile');
const report = require('vfile-reporter');

const contents = unified()
  .use(parse)
  .use(stringify)
  .use(frontmatter, ['yaml', 'toml'])
  .use(example)
  .process(vfile.readSync('01_example.md'), function (err, file) {
    console.error(report(err || file));
    //console.log(String(file));
  });

// console.log(contents);
function logger() {
  return console.dir;
}
