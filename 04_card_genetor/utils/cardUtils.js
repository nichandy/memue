const fse = require('fs-extra');
const createCardData = require('./createCardData');

const decks = [];

exports.generateDecks = () => {
  const fileNames = fse.readdirSync('../../flashcards');
  fileNames.map((fileName) => {
    console.log(fileName);
    return fileName;
    // createCardData(`../../flashcards/${fileName}`, decks);
  });
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
