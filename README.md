## 🚀 Quick start

1.  **Add Markdown Flashcard Files**

    Markdown files are used to create flashcard structure to be used throughout the application. Flashcards are read from `./src/flashcards`. A flashcard set can be defined in markdown as follows:

    ```md
    ---
    title: My Flashcard Set
    section: 1.1
    date: 03-08-21
    ---

    # Term 1

    A definition can be defined with any markdown syntax excluding the H1 header.

    All of GitHub Flavored Markdown (GFM) syntax is supported.

    Thematic breaks signify the end of a definition. Each card must end with a thematic break including the last card of the file.

    ---
    ```

    > **Note:** Frontmatter defined at top of the file is separated from the rest of the file. The "thematic break" syntax rules are not applied to frontmatter when creating cards.

2.  **Generate Flashcards**

    Markdown files are parsed using Unified and Remark AST utilies.

    To manually generate flashcard database, run the generate script.

    ```shell
    yarn run generate
    ```

    Automatic flashcard generation follows the same process as above but within the repository itself. Anytime new markdown flashcards are pushed to `./src/flashcards/` the github action will generate flashcards and add it to the `json` database.

3.  **Running Static Site Locally**

    ```shell
    gatsby develop
    ```

    Use `gatsby develop` to start the site.
    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Changes to the codebase while the gatsby server will appear on the webpage automatically.

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── public
    ├── src
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── yarn-lock.json

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`.eslintrc`**: This is a configuration file for [ESlint](https://eslint.org/). ESlint improves code consistency and reduces syntax errors. This project follows the Airbnb style preset.

6.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

7.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/gatsby-config/) for more detail).

8.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

9.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

10. **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

11. **`yarn-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

12. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

13. **`README.md`**: A text file containing useful reference information about your project.

## 💫 Deploy

`**TBD**` The first iteration of this project will be deployed to github pages. Utilizing gatsby plugins.

<!-- AUTO-GENERATED-CONTENT:END -->
