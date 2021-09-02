import React from 'react';

import { MarketplaceTaskItem } from 'components';

const MarketplaceComplexTasks = () => {
  return (
    <div className='marketplace-complex-tasks'>
      <div className='marketplace-complex-tasks-content'>
        <div className='marketplace-complex-tasks-title'>
          Os <strong>fluxos de tarefas</strong> podem resolver problemas
          completos e mais complexos.
        </div>

        <div className='marketplace-complex-tasks-list'>
          {[1, 2, 3].map((key) => {
            return (
              <MarketplaceTaskItem.Box
                key={key}
                taskCategory='DATASETS'
                header={<div>Header</div>}
                footer={<div>Footer</div>}
              >
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
                <div>Content</div>
              </MarketplaceTaskItem.Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceComplexTasks;
