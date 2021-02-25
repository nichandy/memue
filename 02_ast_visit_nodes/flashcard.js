const visitChildren = require('unist-util-visit-children');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const findAllAfter = require('unist-util-find-all-after');
const position = require('unist-util-position');

/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options) => (tree) => {
  let definition = '';
  let card = {};
  let flashcards = [];
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
      const obj = Object.fromEntries(mp);

      // TODO Construct flashcard set title and details
      card = { ...obj };
      return;
    }

    // Store H1 as Flash Card Term
    if (is(node, { type: 'heading', depth: 1 })) {
      // console.log('------------------ Card Start -------------------');
      // TODO Construct card Term
      card = { ...card, term: node.children[0].value };
      // console.log(`Term: ${node.children[0].value}`);
      // console.log('Definition: ');
      return;
    }

    // End Card Definition and store markdown
    if (is(node, 'thematicBreak')) {
      // TODO Construct card Defitinition and add card to flash card set
      card = { ...card, definition: definition };
      flashcards.push(card);
      //console.log(flashcards);
      const { line: TreePositionEnd } = position.end(tree);
      const { line: NodePositionEnd } = position.end(node);
      if (NodePositionEnd === TreePositionEnd - 1) {
        console.log(flashcards);
      }
      // console.log('Store: Definition');
      // console.log(definition);
      // console.log('------------------ Card End -------------------');
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
