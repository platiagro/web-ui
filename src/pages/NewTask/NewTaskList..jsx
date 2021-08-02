import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { LayoutTwoTone } from '@ant-design/icons';

import { Placeholder, TaskTemplateItem } from 'components';

const NewTaskList = ({
  isLoadingTasks,
  handleCreateTaskCopy,
  tasksGroupedByCategory,
}) => {
  return (
    <>
      <div className='new-task-page-content-panels-left-title'>
        <LayoutTwoTone twoToneColor='#a9a9a9' />
        <span>Comece Por Um Exemplo</span>
      </div>

      {(() => {
        if (isLoadingTasks) return null;

        return tasksGroupedByCategory.map((category) => {
          return (
            <div key={category.key}>
              <div className='new-task-page-content-panels-left-category'>
                {category.name}
              </div>

              <div className='new-task-page-content-panels-left-list'>
                {category.tasks.length === 0 && (
                  <Placeholder
                    className='new-task-page-content-panels-left-list-empty'
                    iconComponent={<LayoutTwoTone twoToneColor='#a9a9a9' />}
                    message='Não Existe Nenhuma Tarefa Nesta Categoria'
                  />
                )}

                {category.tasks.map((task) => {
                  // If you change the item width you need to update the description length
                  const descriptionLength = task.description?.length || 0;
                  const isTooltipVisible = descriptionLength > 148;

                  const handleCreateCopyOfThisTask = () => {
                    handleCreateTaskCopy(task);
                  };

                  return (
                    <Tooltip
                      key={`task-tooltip-${task.uuid}`}
                      color='black'
                      placement='right'
                      title={task.description}
                      zIndex={isTooltipVisible ? undefined : -1}
                    >
                      <TaskTemplateItem
                        key={`task-item-${task.uuid}`}
                        className='new-task-page-content-panels-left-item'
                        title={task.name}
                        buttonText='Criar Tarefa'
                        description={task.description}
                        handleClickButton={handleCreateCopyOfThisTask}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          );
        });
      })()}
    </>
  );
};

NewTaskList.propTypes = {
  isLoadingTasks: PropTypes.bool.isRequired,
  handleCreateTaskCopy: PropTypes.func.isRequired,
  tasksGroupedByCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTaskList;
