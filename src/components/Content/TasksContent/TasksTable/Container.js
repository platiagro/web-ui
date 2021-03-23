// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

// ACTIONS
import {
  showCopyTaksModal,
  deleteTask,
  fetchTasks,
  showTasksModal,
} from 'store/tasks/actions';

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
      dispatch(deleteTask(id));
    },
    handleShowTasksModal: (record) => dispatch(showTasksModal(record)),
    handleCopyTaskRequest: (record) => dispatch(showCopyTaksModal(record)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    containerState: state.tasksReducer.containerState,
    loading: state.uiReducer.tasksTable.loading,
    tasks: state.tasksReducer.tasks,
  };
};

/**
 * Tasks Table Container.
 * This component is responsible for create a logic container for tasks table
 * with redux.
 */
const TasksTableContainer = (props) => {
  const {
    containerState,
    handleCopyTaskRequest,
    handleDeleteTask,
    handleFetchTasks,
    handleShowTasksModal,
    loading,
    tasks,
  } = props;

  // Fetch tasks on component did mount
  useLayoutEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  // HANDLERS
  const taskClickHandler = (taskName) => {
    window.open(
      `/jupyterlab/tree/tasks/${taskName}/?reset&open=Experiment.ipynb,Deployment.ipynb`
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
        containerState={containerState}
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
