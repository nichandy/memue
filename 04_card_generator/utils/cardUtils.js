const fse = require('fs-extra');
const path = require('path');
const createCardData = require('./createCardData');
const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const frontmatter = require('remark-frontmatter');
const gfm = require('remark-gfm');
const vfile = require('to-vfile');
const report = require('vfile-reporter');
const createFlashcard = require('./parseCards');

const decks = [];

exports.storeData = (data, path) => {
  try {
    fse.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

exports.loadData = (path) => {
  try {
    return fse.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
    return false;
  }
};

exports.generateDecks = () => {
  const fileNames = fse.readdirSync(`${__dirname}/../flashcards`);
  fileNames.map((fileName) => {
    console.log(fileName);
    console.log(path.join(__dirname, '..', 'flashcards', fileName));

    unified()
      .use(parse)
      .use(gfm)
      .use(stringify)
      .use(frontmatter, ['yaml', 'toml'])
      .use(createFlashcard(decks))
      .process(fse.readFileSync(`${__dirname}/../flashcards/${fileName}`));
  });
  console.log(decks);
};

// Creates an array of card IDs
exports.createDeck = (flashcards) => {
  const deck = [];
  flashcards.forEach((card) => {
    deck.push(card.id);
  });
  return deck;
};

// Shuffles array of card IDs
exports.cardShuffle = (deck) => {
  const shuffle = deck;
  for (let i = shuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = shuffle[i];
    shuffle[i] = shuffle[j];
    shuffle[j] = temp;
  }
  return shuffle;
};
