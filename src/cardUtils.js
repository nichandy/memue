const fse = require('fs-extra');

// Load cards from json file
const loadFlashcards = (path) => {
  try {
    return JSON.parse(fse.readFileSync(path, 'utf8'));
  } catch (err) {
    return false;
  }
};

// Store cards to json file
const storeFlashcards = (data, path) => {
  fse.outputFileSync(path, JSON.stringify(data), (err) => {
    console.log(err);
  });
};

exports.addFlashcards = (flashcards, path) => {
  if (fse.pathExistsSync(path)) {
    let data = loadFlashcards(path);
    data.push(flashcards);
    storeFlashcards(data, path);
  } else {
    let decks = [];
    decks.push(flashcards);
    storeFlashcards(decks, path);
  }
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
