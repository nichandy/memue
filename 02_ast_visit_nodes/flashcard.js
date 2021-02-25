const visitChildren = require('unist-util-visit-children');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const syntax = require('micromark-extension-gfm');

/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options) => (tree) => {
  let definition = '';
  // Traverse mdast syntax tree
  let visit = visitChildren((node, index, parent) => {
    // Skip root node traversal
    if (is(node, 'root')) return;

    // Store frontmatter
    if (is(node, 'yaml') || is(node, 'toml')) {
      const frontmatter = node.value.split('\n').map((element) => {
        let splitElement = element.split(':');
        return splitElement.map((e) => e.trim());
      });
      const mp = new Map(frontmatter);
      return;
    }

    // Store H1 as Flash Card Term
    if (is(node, { type: 'heading', depth: 1 })) {
      console.log('------------------ Card Start -------------------');
      console.log(`Term: ${node.children[0].value}`);
      console.log('Definition: ');
      return;
    }

    // End Card Definition and store markdown
    if (is(node, 'thematicBreak')) {
      console.log('Store: Definition');
      console.log(definition);
      console.log('------------------ Card End -------------------');
      return;
    }

    // Convert definition nodes back to markdown
    definition += toMarkdown(node, { extensions: [gfm.toMarkdown()] });
  });

  visit(tree);
};

const logNode = (node) => {
  console.log(JSON.stringify(node, null, 2));
};
