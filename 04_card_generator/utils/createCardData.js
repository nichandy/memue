const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const frontmatter = require('remark-frontmatter');
const gfm = require('remark-gfm');
const vfile = require('to-vfile');
const report = require('vfile-reporter');
const createFlashcard = require('./parseCards');

module.exports = (filePath) => {
  unified()
    .use(parse)
    .use(gfm)
    .use(stringify)
    .use(frontmatter, ['yaml', 'toml'])
    .use(createFlashcard)
    .process(filePath, function (err, file) {
      console.error(report(err || file));
      // console.log(String(file));
    });
};

// console.log(contents);
function logger() {
  return console.dir;
}
