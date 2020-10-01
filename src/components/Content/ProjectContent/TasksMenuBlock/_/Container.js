// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import TasksMenuBlock from './index';

// ACTIONS
import { createOperatorRequest } from '../../../../../store/operator/actions';
import {
  fetchTasksMenuRequest,
  filterTasksMenu,
} from '../../../../../store/tasksMenu/actions';
import {
  setTemplateRequest,
  deleteTemplateRequest,
} from '../../../../../store/templates/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchTasksMenu: () => dispatch(fetchTasksMenuRequest()),
    handleFilterTasksMenu: (filter) => dispatch(filterTasksMenu(filter)),
    handleCreateOperator: (
      projectId,
      experimentId,
      taskId,
      tasks,
      isTemplate,
      position
    ) =>
      dispatch(
        createOperatorRequest(
          projectId,
          experimentId,
          taskId,
          tasks,
          isTemplate,
          position
        )
      ),
    handleSetTemplate: (projectId, experimentId, templateId) =>
      dispatch(setTemplateRequest(projectId, experimentId, templateId)),
    handleDeleteTemplate: (templateId) =>
      dispatch(deleteTemplateRequest(templateId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.tasksMenu.loading,
    tasks: state.tasksReducer.tasks,
    tasksMenu: state.tasksMenuReducer.filtered,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

/**
 * Tasks Menu Block Container.
 * This component is responsible for create a logic container for
 * tasks menu block with redux.
 */
const TasksMenuBlockContainer = ({
  tasks,
  loading,
  trainingLoading,
  trainingSucceeded,
  tasksMenu,
  handleFetchTasksMenu,
  handleFilterTasksMenu,
  handleCreateOperator,
  handleSetTemplate,
  disabled,
  handleDeleteTemplate,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching menu tasks
    handleFetchTasksMenu();
  }, [handleFetchTasksMenu]);

  // HANDLERS
  const createOperatorHandler = (taskId, taskType, position) => {
    // is template
    const isTemplate = taskType === 'TEMPLATES';
    // is template
    if (isTemplate) handleSetTemplate(projectId, experimentId, taskId);
    // not is template
    else
      handleCreateOperator(
        projectId,
        experimentId,
        taskId,
        tasks,
        isTemplate,
        position
      );
  };

  // RENDER
  return (
    <TasksMenuBlock
      handleTaskClick={createOperatorHandler}
      handleFilter={handleFilterTasksMenu}
      handleDeleteTemplate={handleDeleteTemplate}
      menu={tasksMenu}
      disabled={disabled || trainingLoading}
      loading={loading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksMenuBlockContainer);
