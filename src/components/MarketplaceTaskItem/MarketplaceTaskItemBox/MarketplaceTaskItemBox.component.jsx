import React from 'react';
import PropTypes from 'prop-types';

import { MARKETPLACE_TASK_CATEGORIES } from 'configs';

import './MarketplaceTaskItemBox.style.less';

const MarketplaceTaskItemBox = ({
  header,
  footer,
  onClick,
  children,
  tabIndex,
  className,
  taskCategory,
  borderDirection,
}) => {
  const borderDirectionClass = `marketplace-task-item-box-${borderDirection}`;

  const getColor = () => {
    return (
      MARKETPLACE_TASK_CATEGORIES[taskCategory]?.color ||
      MARKETPLACE_TASK_CATEGORIES.DATASETS.color
    );
  };

  return (
    <div
      className={`marketplace-task-item-box ${className} ${borderDirectionClass}`}
      role='button'
      onKeyPress={null}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <div
        style={{ background: getColor() }}
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
  onClick: PropTypes.func,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  className: PropTypes.string,
  taskCategory: PropTypes.oneOf(Object.keys(MARKETPLACE_TASK_CATEGORIES)),
  borderDirection: PropTypes.oneOf(['left', 'top']),
};

MarketplaceTaskItemBox.defaultProps = {
  header: null,
  footer: null,
  onClick: null,
  children: null,
  tabIndex: -1,
  className: '',
  taskCategory: MARKETPLACE_TASK_CATEGORIES.DATASETS.key,
  borderDirection: 'top',
};

export default MarketplaceTaskItemBox;
