import { TASK_CATEGORIES } from 'configs';
import PropTypes from 'prop-types';
import React from 'react';

import './MarketplaceTaskItemBox.style.less';

const COLORS = {
  [TASK_CATEGORIES.DATASETS.key]: '#ff0000',
  [TASK_CATEGORIES.FEATURE_ENGINEERING.key]: '#ff0000',
  [TASK_CATEGORIES.PREDICTOR.key]: '#ff0000',
  [TASK_CATEGORIES.DESCRIPTIVE_STATISTICS.key]: '#ff0000',
  [TASK_CATEGORIES.COMPUTER_VISION.key]: '#ff0000',
  OPTIMIZATION: '#ff0000',
  OTHER: '#ff0000',
};

const MarketplaceTaskItemBox = ({
  header,
  footer,
  children,
  taskCategory,
  borderDirection,
}) => {
  const borderDirectionClass = `marketplace-task-item-box-${borderDirection}`;
  const color = COLORS[taskCategory];

  return (
    <div className={`marketplace-task-item-box ${borderDirectionClass}`}>
      <div
        style={{ background: color }}
        className='marketplace-task-item-box-border'
      />

      <div className='marketplace-task-item-box-content'>
        {header}
        {children}
        {footer}
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
