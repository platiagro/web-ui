import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getTasks } from 'store/tasks';
import { useDeepEqualSelector } from 'hooks';
import { createOperatorRequest } from 'store/operator';
import {
  fetchTasksMenuRequest,
  filterTasksMenu,
} from 'store/tasksMenu/actions';
import {
  setTemplateRequest,
  deleteTemplateRequest,
} from 'store/templates/actions';

import TasksMenuBlock from './index';

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

  const tasks = useDeepEqualSelector(getTasks);
  const loading = useDeepEqualSelector(loadingSelector);
  const allTasks = useDeepEqualSelector(allTasksSelector);
  const tasksMenu = useDeepEqualSelector(tasksMenuSelector);
  const trainingLoading = useDeepEqualSelector(trainingLoadingSelector);

  const handleDeleteTemplate = (templateId) => {
    dispatch(deleteTemplateRequest(templateId, allTasks));
  };

  const handleFilterTasksMenu = (filter) => {
    dispatch(filterTasksMenu(filter));
  };

  const handleSetTemplate = (
    currentProjectId,
    currentExperimentId,
    selectedTemplateId
  ) => {
    dispatch(
      setTemplateRequest(
        currentProjectId,
        currentExperimentId,
        selectedTemplateId
      )
    );
  };

  const handleCreateOperator = (
    currentProjectId,
    currentExperimentId,
    taskId,
    taskList,
    isTemplate,
    position
  ) => {
    dispatch(
      createOperatorRequest(
        currentProjectId,
        currentExperimentId,
        taskId,
        taskList,
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
