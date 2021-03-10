import { useStaticQuery, graphql } from 'gatsby';

/**
 * useAllFlashcards returns the entire object array from flashcards.json
 */
const useAllFlashcards = () => {
  const data = useStaticQuery(graphql`
    query Decks {
      allFlashcards {
        edges {
          node {
            fields {
              slug
            }
            cards {
              deckId
              definition
              id
              term
            }
            info {
              date
              id
              section
              title
            }
          }
        }
      }
    }
  `);
  return data;
};

export default useAllFlashcards;
