// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import {
  showCopyTaksModal,
  fetchDeleteTask,
  fetchTasks,
  showTasksModal,
} from '../../../../store/tasks/actions';

// COMPONENTS
import TasksTable from './index';

import { TasksEmptyPlaceholder } from 'components/EmptyPlaceholders';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchTasks: () => {
      dispatch(fetchTasks());
    },
    handleDeleteTask: (id) => {
      dispatch(fetchDeleteTask(id));
    },
    handleShowTasksModal: (record) => dispatch(showTasksModal(record)),
    handleCopyTaskRequest: (record) => dispatch(showCopyTaksModal(record)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    tasks: state.tasksReducer.tasks,
    loading: state.uiReducer.tasksTable.loading,
  };
};

/**
 * Tasks Table Container.
 * This component is responsible for create a logic container for tasks table
 * with redux.
 *
 * @param props
 */
const TasksTableContainer = (props) => {
  // states
  const { tasks, loading } = props;
  // dispatchs
  const {
    handleFetchTasks,
    handleDeleteTask,
    handleShowTasksModal,
    handleCopyTaskRequest,
  } = props;

  // Fetch tasks on component did mount
  useLayoutEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  // HANDLERS
  const taskClickHandler = (taskName) => {
    const jupyterDomain =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_MAIN_DOMAIN
        : '';

    window.open(
      `${jupyterDomain}/notebook/anonymous/server/lab/tree/tasks/${taskName}/?reset&open=Experiment.ipynb,Deployment.ipynb`
    );
  };

  // Remove the dataset task
  const filteredTasks = tasks.filter((task) => {
    return task.tags.indexOf('DATASETS') <= -1;
  });

  // RENDER
  return loading || (tasks && tasks.length > 0) ? (
    <div className='tasksContainer'>
      <TasksTable
        tasks={filteredTasks}
        handleClickTask={taskClickHandler}
        handleClickEdit={handleShowTasksModal}
        handleClickDelete={handleDeleteTask}
        handleCopyTaskRequest={handleCopyTaskRequest}
        loading={loading}
      />
    </div>
  ) : (
    <TasksEmptyPlaceholder />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTableContainer);
