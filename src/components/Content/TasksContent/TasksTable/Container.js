// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

// UI COMPONENTS
import { ConfigProvider } from 'antd';
// import TasksTablePagination from '../TasksTablePagination/Container';

// ACTIONS
import {
  deleteTask,
  fetchTasks,
  showTasksModal,
} from '../../../../store/tasks/actions';

// COMPONENTS
import TasksEmpty from '../TasksEmpty';
import TasksTable from './index';

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
 */
const TasksTableContainer = (props) => {
  // states
  const { tasks, loading } = props;
  // dispatchs
  const { handleFetchTasks, handleDeleteTask, handleShowTasksModal } = props;

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
  return (
    <ConfigProvider renderEmpty={TasksEmpty}>
      <TasksTable
        tasks={filteredTasks}
        handleClickTask={taskClickHandler}
        handleClickEdit={handleShowTasksModal}
        handleClickDelete={handleDeleteTask}
        loading={loading}
      />
      {/* <br />
      <TasksTablePagination /> */}
    </ConfigProvider>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTableContainer);
