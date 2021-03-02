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

// Returns true if current deck has flashcards that match those being added
const hasDuplicates = (deck, newCards) => {
  return (
    deck.filter((cards) => {
      return cards.info.title === newCards.info.title;
    }).length > 0
  );
};

exports.addFlashcards = (flashcards, path) => {
  if (fse.pathExistsSync(path)) {
    const data = loadFlashcards(path);

    // If not duplicate then push new cards
    if (!hasDuplicates) {
      data.push(flashcards);
      storeFlashcards(data, path);
    } else {
      console.log(`Duplicate Deck Found: ${flashcards.info.title}`);
    }
  } else {
    const decks = [];
    decks.push(flashcards);
    storeFlashcards(decks, path);
  }
};

// Shuffles array of card IDs
exports.cardShuffle = (deck) => {
  let d;
  for (let i = deck.length - 1; i > 0; i -= 1) {
    d = deck;
    const j = Math.floor(Math.random() * i);
    const temp = d[i];
    d[i] = d[j];
    d[j] = temp;
  }
  return d;
};
