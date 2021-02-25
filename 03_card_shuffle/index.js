const fse = require('fs-extra');
const cardUtil = require('./flashcardUtil');

const flashcards = cardUtil.loadData('./My-Flash-Card-Set.json');
const deck = cardUtil.createDeck(JSON.parse(flashcards));
console.log({ inorder: deck });
let shuffled = cardUtil.cardShuffle(deck);
console.log({ shuffled: shuffled });
shuffled = cardUtil.cardShuffle(deck);
console.log({ shuffled: shuffled });
