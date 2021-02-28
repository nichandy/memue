const fse = require('fs-extra');
const markdowngfm = require('./markdowngfm');

let filenames = fse.readdirSync('./flashcards');
filenames.map((filename) => {
  let doc = fse.readFileSync(`./flashcards/${filename}`);
  markdowngfm(doc);
});
