import PropTypes from 'prop-types';
import React from 'react';

import './MarketplaceTaskItemBox.style.less';

const COLORS = {
  DATASETS: '#FF9C6E',
  FEATURE_ENGINEERING: '#FFD666',
  PREDICTOR: '#FFF566',
  DESCRIPTIVE_STATISTICS: '#D3F261',
  COMPUTER_VISION: '#5CDBD3',
  OPTIMIZATION: '#69C0FF',
  OTHER: '#85A5FF',
};

const MarketplaceTaskItemBox = ({
  header,
  footer,
  children,
  taskCategory,
  borderDirection,
}) => {
  const borderDirectionClass = `marketplace-task-item-box-${borderDirection}`;
  const color = COLORS[taskCategory] || COLORS.DATASETS;

  return (
    <div className={`marketplace-task-item-box ${borderDirectionClass}`}>
      <div
        style={{ background: color }}
        className='marketplace-task-item-box-border'
      />

      <div className='marketplace-task-item-box-content'>
        <div className='marketplace-task-item-box-content-header'>{header}</div>
        <div className='marketplace-task-item-box-content-body'>{children}</div>
        <div className='marketplace-task-item-box-content-footer'>{footer}</div>
      </div>
    </div>
  );
};

MarketplaceTaskItemBox.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
  taskCategory: PropTypes.oneOf(Object.keys(COLORS)),
  borderDirection: PropTypes.oneOf(['left', 'top']),
};

MarketplaceTaskItemBox.defaultProps = {
  header: null,
  footer: null,
  children: null,
  taskCategory: '',
  borderDirection: 'top',
};

export default MarketplaceTaskItemBox;
