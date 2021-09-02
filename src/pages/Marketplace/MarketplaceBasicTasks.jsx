import React from 'react';

import { MarketplaceTaskItem } from 'components';

const MarketplaceBasicTasks = () => {
  return (
    <div className='marketplace-basic-tasks'>
      <div className='marketplace-basic-tasks-content'>
        <div className='marketplace-basic-tasks-title'>
          Na PlatIAgro, <strong>tarefas</strong> solucionam parte de um
          problema.
        </div>

        <div className='marketplace-basic-tasks-list'>
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

export default MarketplaceBasicTasks;
