const visit = require('unist-util-visit');
const is = require('unist-util-is');
const { nanoid } = require('nanoid');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const position = require('unist-util-position');

module.exports = (options) => (tree) => {
  let card = {};
  let frontmatter = {};
  const deckId = nanoid();
  let definition = '';
  visit(tree, (node, index, parent) => {
    // Skip root node traversal

    if (is(node, 'yaml') || is(node, 'toml')) {
      const rawFrontmatter = node.value.split('\n').map((element) => {
        let splitElement = element.split(':').map((e) => e.trim());
        return splitElement;
      });
      const mp = new Map(rawFrontmatter);
      const obj = Object.fromEntries(mp);
      frontmatter = { id: deckId, ...obj };
      //console.log(frontmatter);
      return;
    }

    if (is(node, 'heading')) {
      card = { deckId: deckId, id: nanoid(), term: node.children[0].value };
      //console.log(card);
      return;
    }

    // End Card Definition and store markdown
    if (is(node, 'thematicBreak')) {
      card = { ...card, definition: definition };
      //flashcards.push(card);

      // Prevent storing flashcards until file is fully parsed
      const { line: TreePositionEnd } = position.end(tree);
      const { line: NodePositionEnd } = position.end(node);
      if (NodePositionEnd === TreePositionEnd - 1) {
        console.log(card);
        //storeData(flashcards, `./${setTitle.join('-')}.json`);
      }
      return;
    }
    // Convert definition nodes back to markdown
    definition += toMarkdown(node, { extensions: [gfm.toMarkdown()] });
  });
};
