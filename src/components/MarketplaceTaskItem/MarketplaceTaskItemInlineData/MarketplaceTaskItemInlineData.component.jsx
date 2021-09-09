import React from 'react';
import PropTypes from 'prop-types';

import './MarketplaceTaskItemInlineData.style.less';
import { TASK_CATEGORIES } from 'configs';

const MarketplaceTaskItemInlineData = ({ taskType, taskCategory }) => {
  const inlineDataArray = [];

  if (taskType) {
    inlineDataArray.push(['Tipo:', taskType]);
  }

  if (taskCategory) {
    const taskCategoryName = TASK_CATEGORIES[taskCategory]?.name;
    inlineDataArray.push(['Categoria:', taskCategoryName || taskCategory]);
  }

  return (
    <div className='marketplace-task-item-inline-data'>
      {inlineDataArray.map((inlineData, index) => {
        const canShowDivider = index + 1 < inlineDataArray.length;
        const dataWithLabel = inlineData.join(' ');
        const dividerClassName = 'marketplace-task-item-inline-data-divider';

        return (
          <span key={index}>
            <span>{dataWithLabel}</span>
            {canShowDivider && <span className={dividerClassName}>|</span>}
          </span>
        );
      })}
    </div>
  );
};

MarketplaceTaskItemInlineData.propTypes = {
  taskCategory: PropTypes.string,
  taskType: PropTypes.string,
};

MarketplaceTaskItemInlineData.defaultProps = {
  taskCategory: '',
  taskType: '',
};

export default MarketplaceTaskItemInlineData;
