const visitChildren = require('unist-util-visit-children');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const position = require('unist-util-position');
const { nanoid } = require('nanoid');

const logNode = (node) => {
  console.log(JSON.stringify(node, null, 2));
};

/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options, decks) => (tree) => {
  let definition = '';
  const cards = {
    setId: nanoid(),
    setName: '',
    cards: [],
  };
  let card = {};

  // Traverse mdast syntax tree
  const visit = visitChildren((node) => {
    // Skip root node traversal
    if (is(node, 'root')) return;

    // Store frontmatter
    if (is(node, 'yaml') || is(node, 'toml')) {
      const frontmatter = node.value.split('\n').map((element) => {
        const splitElement = element.split(':');
        return splitElement.map((e) => e.trim());
      });
      const mp = new Map(frontmatter);
      const obj = Object.fromEntries(mp);

      card = { ...obj };
      return;
    }

    // Store H1 as Flash Card Term
    if (is(node, { type: 'heading', depth: 1 })) {
      card = { ...card, id: nanoid(), term: node.children[0].value };
      return;
    }

    // End Card Definition and store markdown
    if (is(node, 'thematicBreak')) {
      card = { ...card, definition: definition };
      cards.push(card);

      // Prevent storing flashcards until file is fully parsed
      const { line: TreePositionEnd } = position.end(tree);
      const { line: NodePositionEnd } = position.end(node);
      if (NodePositionEnd === TreePositionEnd - 1) {
        const setTitle = card.title.split('_');
        console.log(`./${setTitle.join('-')}.json`);
        console.log(cards);
        decks.push(cards);
      }
      return;
    }

    // Convert definition nodes back to markdown
    definition += toMarkdown(node, { extensions: [gfm.toMarkdown()] });
  });

  visit(tree);
};
