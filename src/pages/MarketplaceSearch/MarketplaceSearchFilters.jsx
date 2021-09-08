import React from 'react';
import PropTypes from 'prop-types';

const MarketplaceSearchFilters = ({ filters }) => {
  return <div>{JSON.stringify(filters)}</div>;
};

MarketplaceSearchFilters.propTypes = {
  filters: PropTypes.object,
};

MarketplaceSearchFilters.defaultProps = {
  filters: {},
};

export default MarketplaceSearchFilters;
