import React from 'react';
import { Link } from 'gatsby';
import { graphql } from 'gatsby';
import DeckList from '../components/deckList';
import useAllFlashcards from '../hooks/useAllFlashcards';

import Layout from '../components/layout';
import SEO from '../components/seo';
import '../sass/global.scss';

const IndexPage = () => {
  const { allFlashcards } = useAllFlashcards();

  return (
    <Layout>
      <SEO title="Home" />
      <section className="section">
        <h1 className="title is-secondary">Security+ Decks</h1>
        <h2 className="subtitle">Select a deck to start learning.</h2>
        <DeckList decks={allFlashcards.edges} />
      </section>
    </Layout>
  );
};

export default IndexPage;
