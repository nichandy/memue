const fs = require('fs');
const fromMarkdown = require('mdast-util-from-markdown');

const doc = fs.readFileSync('demo.md');

const tree = fromMarkdown(doc);

//console.log(tree);

console.log(tree.children[1]);
