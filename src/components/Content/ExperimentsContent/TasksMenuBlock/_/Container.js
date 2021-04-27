import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createOperatorRequest } from 'store/operator/actions';
import {
  fetchTasksMenuRequest,
  filterTasksMenu,
} from 'store/tasksMenu/actions';
import {
  setTemplateRequest,
  deleteTemplateRequest,
} from 'store/templates/actions';
import { fetchTasks } from 'store/tasks';

import TasksMenuBlock from './index';

const tasksSelector = ({ tasksReducer }) => {
  return tasksReducer.tasks;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.tasksMenu.loading;
};

const allTasksSelector = ({ tasksMenuReducer }) => {
  return tasksMenuReducer;
};

const tasksMenuSelector = ({ tasksMenuReducer }) => {
  return tasksMenuReducer.filtered;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const TasksMenuBlockContainer = ({ disabled }) => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const tasks = useSelector(tasksSelector);
  const loading = useSelector(loadingSelector);
  const allTasks = useSelector(allTasksSelector);
  const tasksMenu = useSelector(tasksMenuSelector);
  const trainingLoading = useSelector(trainingLoadingSelector);

  const handleDeleteTemplate = (templateId) => {
    dispatch(deleteTemplateRequest(templateId, allTasks));
  };

  const handleFilterTasksMenu = (filter) => {
    dispatch(filterTasksMenu(filter));
  };

  const handleSetTemplate = (projectId, experimentId, templateId) => {
    dispatch(setTemplateRequest(projectId, experimentId, templateId));
  };

  const handleCreateOperator = (
    projectId,
    experimentId,
    taskId,
    tasks,
    isTemplate,
    position
  ) => {
    dispatch(
      createOperatorRequest(
        projectId,
        experimentId,
        taskId,
        tasks,
        isTemplate,
        position
      )
    );
  };

  const handleTaskClick = (taskId, taskType, position) => {
    const isTemplate = taskType === 'TEMPLATES';
    if (isTemplate) {
      handleSetTemplate(projectId, experimentId, taskId);
    } else {
      handleCreateOperator(
        projectId,
        experimentId,
        taskId,
        tasks,
        isTemplate,
        position
      );
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTasksMenuRequest());
  }, [dispatch]);

  return (
    <TasksMenuBlock
      menu={tasksMenu}
      loading={loading}
      disabled={disabled || trainingLoading}
      handleTaskClick={handleTaskClick}
      handleFilter={handleFilterTasksMenu}
      handleDeleteTemplate={handleDeleteTemplate}
    />
  );
};

TasksMenuBlockContainer.propTypes = {
  disabled: PropTypes.bool,
};

TasksMenuBlockContainer.defaultProps = {
  disabled: false,
};

export default TasksMenuBlockContainer;
