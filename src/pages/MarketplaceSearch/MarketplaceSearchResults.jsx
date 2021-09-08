import React from 'react';
import PropTypes from 'prop-types';

const MarketplaceSearchResults = ({ tasks }) => {
  return (
    <div>
      {tasks.map((_, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
};

MarketplaceSearchResults.propTypes = {
  tasks: PropTypes.array,
};

MarketplaceSearchResults.defaultProps = {
  tasks: [],
};

export default MarketplaceSearchResults;
