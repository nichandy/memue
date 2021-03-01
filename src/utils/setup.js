const fse = require('fs-extra');
const path = require('path');
const markdowngfm = require('./mdProcessor');

console.log(path.join(__dirname, '..'));

// let filenames = fse.readdirSync(`${__dirname}/flashcards`);
// filenames.map((filename) => {
//   let doc = fse.readFileSync(`${__dirname}/flashcards/${filename}`);
//   markdowngfm(doc);
// });
