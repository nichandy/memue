const fse = require('fs-extra');

// Loads file from specified path
// TODO Replace with graphql transformer json
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
