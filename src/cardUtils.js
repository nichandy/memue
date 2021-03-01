const fse = require('fs-extra');

// Load cards from json file
const loadFlashcards = (path) => {
  try {
    const data = fse.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return false;
  }
};

// Store cards to json file
const storeFlashcards = (data, path) => {
  try {
    fse.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};

exports.addFlashcards = (flashcards, path) => {
  let data = loadFlashcards(path);
  if (data) {
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
