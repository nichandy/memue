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
            cards {
              id
              deckId
              term
              definition
            }
            info {
              id
              section
              title
              date
            }
          }
        }
      }
    }
  `);
  return data;
};

export default useAllFlashcards;
