const fse = require('fs-extra');
const path = require('path');
const markdowngfm = require('./mdProcessor');

const contentPath = path.join(__dirname, '..', 'flashcards');

const filenames = fse.readdirSync(contentPath);
filenames.forEach((filename) => {
  const doc = fse.readFileSync(path.join(contentPath, filename));
  markdowngfm(doc);
});
