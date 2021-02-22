const vfile = require('to-vfile');
const report = require('vfile-reporter');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const frontmatter = require('remark-frontmatter');

// Unified creates a consistent language to parse text, html, xml, markdown files
// Language specific plugins can be attached to unified to customize how a file is parsed and compiled
unified()
  .use(parse)
  .use(stringify)
  .use(frontmatter, ['yaml', 'toml'])
  .use(logger)
  .process(vfile.readSync('demo.md'), function (err, file) {
    console.error(report(err || file));
    console.log(String(file));
  });

function logger() {
  return console.dir;
}
