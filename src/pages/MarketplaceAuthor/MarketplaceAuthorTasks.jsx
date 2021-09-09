import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { ShoppingOutlined } from '@ant-design/icons';

import { MarketplaceTaskItem, Placeholder } from 'components';

import MarketplaceAuthorTasksSkeleton from './MarketplaceAuthorTasksSkeleton';

const MarketplaceAuthorTasks = ({ tasks, isLoadingTasks }) => {
  const history = useHistory();

  if (isLoadingTasks) {
    return <MarketplaceAuthorTasksSkeleton />;
  }

  return (
    <div className='marketplace-author-tasks'>
      <div className='marketplace-author-tasks-content'>
        {tasks.map((task) => {
          const handleSeeTask = () => {
            history.push(`/marketplace/tarefas/${task.uuid}`);
          };

          return (
            <MarketplaceTaskItem.Box
              key={task.uuid}
              onClick={handleSeeTask}
              taskCategory={task.category}
              className='marketplace-author-tasks-content-item'
              header={
                <MarketplaceTaskItem.Title>
                  {task.name}
                </MarketplaceTaskItem.Title>
              }
              footer={
                <MarketplaceTaskItem.InlineData
                  taskType={task.type}
                  taskCategory={task.category}
                />
              }
            >
              <MarketplaceTaskItem.Description>
                {task.description}
              </MarketplaceTaskItem.Description>
            </MarketplaceTaskItem.Box>
          );
        })}

        {!tasks.length && (
          <Placeholder
            className='marketplace-author-tasks-content-empty'
            iconComponent={<ShoppingOutlined />}
            message='Nenhuma tarefa ou fluxo encontrado'
          />
        )}
      </div>
    </div>
  );
};

MarketplaceAuthorTasks.propTypes = {
  tasks: PropTypes.array,
  isLoadingTasks: PropTypes.bool,
};

MarketplaceAuthorTasks.defaultProps = {
  tasks: [],
  isLoadingTasks: false,
};

export default MarketplaceAuthorTasks;
