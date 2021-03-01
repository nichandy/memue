const visitChildren = require('unist-util-visit-children');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const position = require('unist-util-position');
const fse = require('fs-extra');
const { nanoid } = require('nanoid');
const cardUtils = require('./cardUtils');
/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options) => (tree) => {
  let card = {};
  let cards = [];
  let flashcards = {};
  let info = {};
  const deckId = nanoid();
  let definition = '';

  // Traverse mdast syntax tree
  const visit = visitChildren((node, index, parent) => {
    // Skip root node traversal
    if (is(node, 'root')) return;

    // Store frontmatter
    if (is(node, 'yaml') || is(node, 'toml')) {
      const frontmatter = node.value.split('\n').map((element) => {
        let splitElement = element.split(':').map((e) => e.trim());
        return splitElement;
      });
      const mp = new Map(frontmatter);
      const obj = Object.fromEntries(mp);
      info = { id: deckId, ...obj };
      return;
    }

    // Store H1 as Flash Card Term
    if (is(node, { type: 'heading', depth: 1 })) {
      card = { id: nanoid(), term: node.children[0].value };
      return;
    }

    // End Card Definition and store markdown
    if (is(node, 'thematicBreak')) {
      // Create card and add it to the array of cards
      card = { deckId: info.id, ...card, definition: definition };
      cards.push(card);

      // Prevent storing cards until file is fully parsed
      const { line: TreePositionEnd } = position.end(tree);
      const { line: NodePositionEnd } = position.end(node);
      if (NodePositionEnd === TreePositionEnd - 1) {
        flashcards = { ...flashcards, info, cards: cards };
        console.log(`Generating ${flashcards.info.title} Flashcards`);
        cardUtils.addFlashcards(
          flashcards,
          `${__dirname}/data/flashcards.json`
        );
      }
      return;
    }
    // Convert definition nodes back to markdown
    definition += toMarkdown(node, { extensions: [gfm.toMarkdown()] });
  });

  visit(tree);
};
