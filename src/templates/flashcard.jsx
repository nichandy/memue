import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import Layout from '../components/layout';

const Flashcard = ({ data }) => {
  // const project = data.markdownRemark;
  const deck = data.flashcards;
  const { title, section, date } = deck.info;
  return (
    <Layout>
      <div className="card">
        <SEO title={title} />
        <header className="card-header">
          <p className="card-header-title">{title}</p>
        </header>
      </div>
    </Layout>
  );
};

Flashcard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object),
};

Flashcard.defaultProps = {
  data: [{}],
};

export const query = graphql`
  query($slug: String!) {
    flashcards(fields: { slug: { eq: $slug } }) {
      info {
        title
        section
        date
      }
    }
  }
`;

export default Flashcard;
