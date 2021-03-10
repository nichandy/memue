import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const DeckListItem = ({ title, date, section, pageLink }) => {
  // Use title to create flashcard page handle
  return (
    <div className="column is-full">
      <div className="card">
        <Link to={pageLink}>
          <header className="card-header is-flex">
            <p className="card-header-title is-justify-content-space-between">
              <span>
                {section} {title}
              </span>
              <span>{date}</span>
            </p>
          </header>
        </Link>
      </div>
    </div>
  );
};

DeckListItem.propTypes = {
  title: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  pageLink: PropTypes.string.isRequired,
};

export default DeckListItem;
