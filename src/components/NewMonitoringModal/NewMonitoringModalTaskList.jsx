import React from 'react';
import PropTypes from 'prop-types';

import MonitoringTaskCard from 'components/MonitoringTaskCard';

import { taskShape } from './propTypes';

const NewMonitoringModalTaskList = ({
  tasks,
  selectedTasks,
  handleSelectTask,
  handleUnselectTask,
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
  tasks: PropTypes.arrayOf(PropTypes.shape(taskShape)),
  selectedTasks: PropTypes.arrayOf(PropTypes.shape(taskShape)),
  handleSelectTask: PropTypes.func,
  handleUnselectTask: PropTypes.func,
};

NewMonitoringModalTaskList.defaultProps = {
  tasks: [],
  selectedTasks: [],
  handleSelectTask: undefined,
  handleUnselectTask: undefined,
};

export default NewMonitoringModalTaskList;
