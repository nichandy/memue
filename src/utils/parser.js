const visitChildren = require('unist-util-visit-children');
const is = require('unist-util-is');
const toMarkdown = require('mdast-util-to-markdown');
const gfm = require('mdast-util-gfm');
const position = require('unist-util-position');
const fse = require('fs-extra');
const { nanoid } = require('nanoid');
<<<<<<< HEAD:src/utils/parser.js

const logNode = (node) => {
  console.log(JSON.stringify(node, null, 2));
};

// Save json data to file
// TODO Replace with graphql call
const storeData = (data, path) => {
  try {
    fse.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

=======
const cardUtils = require('./cardUtils');
>>>>>>> f30b68981b3f442d91927fa7287f6af287976e38:src/mdToCards.js
/*
 * Handles parsing markdown into flashcard format (term, definition) and producing an array of flashcard card objects
 */
module.exports = (options) => (tree) => {
  let card = {};
<<<<<<< HEAD:src/utils/parser.js
  const flashcards = [];
=======
  let cards = [];
  let flashcards = {};
  let info = {};
  const deckId = nanoid();
  let definition = '';
>>>>>>> f30b68981b3f442d91927fa7287f6af287976e38:src/mdToCards.js

  // Traverse mdast syntax tree
  const visit = visitChildren((node, index, parent) => {
    // Skip root node traversal
    if (is(node, 'root')) return;

    // Store frontmatter
    if (is(node, 'yaml') || is(node, 'toml')) {
      const frontmatter = node.value.split('\n').map((element) => {
<<<<<<< HEAD:src/utils/parser.js
        const splitElement = element.split(':');
        return splitElement.map((e) => e.trim());
=======
        let splitElement = element.split(':').map((e) => e.trim());
        return splitElement;
>>>>>>> f30b68981b3f442d91927fa7287f6af287976e38:src/mdToCards.js
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
