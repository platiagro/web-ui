import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getTasks } from 'store/tasks';
import { createOperatorRequest } from 'store/operator';
import { useDeepEqualSelector, useIsLoading } from 'hooks';
import TASKS_MENU_TYPES from 'store/tasksMenu/actionTypes';
import { deleteTemplateRequest } from 'store/templates/templates.actions';
import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';
import { applyTemplateRequest } from 'store/projects/experiments/experiments.actions';
import {
  fetchTasksMenuRequest,
  filterTasksMenu,
} from 'store/tasksMenu/actions';

import TasksMenuBlock from './index';

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
  const allTasks = useDeepEqualSelector(allTasksSelector);
  const tasksMenu = useDeepEqualSelector(tasksMenuSelector);
  const trainingLoading = useDeepEqualSelector(trainingLoadingSelector);

  const loading = useIsLoading(
    TASKS_MENU_TYPES.FETCH_TASKS_MENU_REQUEST,
    TEMPLATES_TYPES.DELETE_TEMPLATE_REQUEST
  );

  const handleDeleteTemplate = (templateId) => {
    dispatch(deleteTemplateRequest([templateId], allTasks));
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
      applyTemplateRequest(
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
