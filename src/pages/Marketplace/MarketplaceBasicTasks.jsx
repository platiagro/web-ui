import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { MarketplaceTaskItem } from 'components';
import { MARKETPLACE_TASK_CATEGORIES } from 'configs';

const CATEGORY_LIST = [
  MARKETPLACE_TASK_CATEGORIES.DATASETS,
  MARKETPLACE_TASK_CATEGORIES.FEATURE_ENGINEERING,
  MARKETPLACE_TASK_CATEGORIES.PREDICTOR,
  MARKETPLACE_TASK_CATEGORIES.DESCRIPTIVE_STATISTICS,
];

const MarketplaceBasicTasks = ({ handleSearchTasks }) => {
  return (
    <div className='marketplace-basic-tasks'>
      <div className='marketplace-basic-tasks-content'>
        <div className='marketplace-basic-tasks-title'>
          Na PlatIAgro, <strong>tarefas</strong> solucionam parte de um
          problema.
        </div>

        <div className='marketplace-basic-tasks-list'>
          {CATEGORY_LIST.map((category) => {
            const handleSearchByCategory = () => {
              handleSearchTasks(category.key);
            };

            return (
              <MarketplaceTaskItem.Box
                key={category.key}
                taskCategory={category.key}
                header={
                  <MarketplaceTaskItem.Title>
                    {category.name}
                  </MarketplaceTaskItem.Title>
                }
                footer={
                  <Button shape='round' onClick={handleSearchByCategory}>
                    Ver tarefas
                  </Button>
                }
              >
                <MarketplaceTaskItem.Description>
                  {category.description}
                </MarketplaceTaskItem.Description>
              </MarketplaceTaskItem.Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MarketplaceBasicTasks.propTypes = {
  handleSearchTasks: PropTypes.func,
};

export default MarketplaceBasicTasks;
