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

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.tasksMenu.loading;
};

const tasksSelector = ({ tasksReducer }) => {
  return tasksReducer.tasks;
};

const tasksMenuSelector = ({ tasksMenuReducer }) => {
  return tasksMenuReducer.filtered;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const allTasksSelector = ({ tasksMenuReducer }) => {
  return tasksMenuReducer;
};

const TasksMenuBlockContainer = ({ disabled }) => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(loadingSelector);
  const tasks = useSelector(tasksSelector);
  const tasksMenu = useSelector(tasksMenuSelector);
  const trainingLoading = useSelector(trainingLoadingSelector);
  const allTasks = useSelector(allTasksSelector);

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

  const handleTaskCLick = (taskId, taskType, position) => {
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
      handleFilter={handleFilterTasksMenu}
      handleTaskClick={handleTaskCLick}
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
