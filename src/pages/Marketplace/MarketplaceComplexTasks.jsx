import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'antd';

import { MarketplaceTaskItem } from 'components';
import { MARKETPLACE_TASK_CATEGORIES } from 'configs';

const CATEGORY_LIST = [
  MARKETPLACE_TASK_CATEGORIES.COMPUTER_VISION,
  MARKETPLACE_TASK_CATEGORIES.OPTIMIZATION,
  MARKETPLACE_TASK_CATEGORIES.OTHER,
];

const MarketplaceComplexTasks = ({ handleSearchTasks }) => {
  return (
    <div className='marketplace-complex-tasks'>
      <div className='marketplace-complex-tasks-content'>
        <div className='marketplace-complex-tasks-title'>
          Os <strong>fluxos de tarefas</strong> podem resolver problemas
          completos e mais complexos.
        </div>

        <div className='marketplace-complex-tasks-list'>
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
                    Ver fluxos
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

MarketplaceComplexTasks.propTypes = {
  handleSearchTasks: PropTypes.func,
};

export default MarketplaceComplexTasks;
