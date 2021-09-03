import React from 'react';
import PropTypes from 'prop-types';

import './MarketplaceTaskItemDescription.style.less';

const MarketplaceTaskItemDescription = ({ children }) => {
  return <div className='marketplace-task-item-description'>{children}</div>;
};

MarketplaceTaskItemDescription.propTypes = {
  children: PropTypes.node,
};

MarketplaceTaskItemDescription.defaultProps = {
  children: null,
};

export default MarketplaceTaskItemDescription;
