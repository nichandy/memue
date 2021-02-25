const fse = require('fs-extra');

// Loads file from specified path
exports.loadData = (path) => {
  try {
    return fse.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Creates an array of card IDs
exports.createDeck = (flashcards) => {
  let deck = [];
  flashcards.forEach((card) => {
    deck.push(card.id);
  });
  return deck;
};

// Shuffles array of card IDs
exports.cardShuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};
