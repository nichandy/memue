import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import DeckListItem from './deckListItem';

const DeckList = ({ decks }) => {
  const [id] = React.useState(nanoid);
  return (
    <div className="container">
      {decks.map(({ node }) => (
        <div className="columns is-centered is-full" key={id}>
          <DeckListItem
            title={node.info.title}
            date={node.info.date}
            section={node.info.section}
            pageLink={node.fields.slug}
          />
        </div>
      ))}
    </div>
  );
};

DeckList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
};

DeckList.defaultProps = {
  projects: [{}],
};

export default DeckList;
