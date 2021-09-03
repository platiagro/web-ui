import React from 'react';
import PropTypes from 'prop-types';

import './MarketplaceTaskItemTitle.style.less';

const MarketplaceTaskItemTitle = ({ children }) => {
  return <div className='marketplace-task-item-title'>{children}</div>;
};

MarketplaceTaskItemTitle.propTypes = {
  children: PropTypes.node,
};

MarketplaceTaskItemTitle.defaultProps = {
  children: null,
};

export default MarketplaceTaskItemTitle;
