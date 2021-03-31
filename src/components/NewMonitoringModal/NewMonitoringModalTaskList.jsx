import React from 'react';
import PropTypes from 'prop-types';

import MonitoringTaskCard from 'components/MonitoringTaskCard';

import { taskShape } from './propTypes';

const NewMonitoringModalTaskList = ({
  handleUnselectTask,
  handleSelectTask,
  selectedTasks,
  tasks,
}) => {
  return (
    <div className='new-monitoring-modal-list'>
      {tasks.map((task) => {
        const isSelected = selectedTasks.includes(task);

        const handleTaskCardClick = () => {
          if (isSelected) handleUnselectTask(task);
          else handleSelectTask(task);
        };

        return (
          <MonitoringTaskCard
            key={task.uuid}
            title={task.name}
            description={task.description}
            onClick={handleTaskCardClick}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

NewMonitoringModalTaskList.propTypes = {
  handleUnselectTask: PropTypes.func,
  handleSelectTask: PropTypes.func,
  selectedTasks: PropTypes.arrayOf(taskShape),
  tasks: PropTypes.arrayOf(taskShape),
};

NewMonitoringModalTaskList.defaultProps = {
  handleUnselectTask: undefined,
  handleSelectTask: undefined,
  selectedTasks: [],
  tasks: [],
};

export default NewMonitoringModalTaskList;
