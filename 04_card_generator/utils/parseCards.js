const visitChildren = require('unist-util-visit-children');
const visit = require('unist-util-visit');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const position = require('unist-util-position');
const fse = require('fs-extra');
const { nanoid } = require('nanoid');
const cardUtils = require('./cardUtils');

const logNode = (node) => {
  console.log(JSON.stringify(node, null, 2));
};

// Save json data to file
const storeData = (data, path) => {
  try {
    fse.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options) => (tree) => {
  let definition = '';
  let card = {};
  const cards = [];

  const visit = visitChildren((node, index, parents) => {
    console.log(node);
  });
  visit(tree);
};
