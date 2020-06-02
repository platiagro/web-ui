// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

// UI COMPONENTS
import { ConfigProvider } from 'antd';

// ACTIONS
import { deleteTask, fetchTasks } from '../../../../store/tasks/actions';

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
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    loading: state.ui.tasksTable.loading,
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
  const { handleClickEdit, handleFetchTasks, handleDeleteTask } = props;

  // Fetch tasks on component did mount
  useLayoutEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  // HANDLERS
  const taskClickHandler = (taskId) => {
    const jupyterDomain =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_MAIN_DOMAIN
        : '';

    window.open(
      `${jupyterDomain}/notebook/anonymous/server/lab/tree/components/${taskId}/?reset&open=Training.ipynb,Inference.ipynb`
    );
  };

  // RENDER
  return (
    <ConfigProvider renderEmpty={TasksEmpty}>
      <TasksTable
        tasks={tasks}
        handleClickTask={taskClickHandler}
        handleClickEdit={handleClickEdit}
        handleClickDelete={handleDeleteTask}
        loading={loading}
      />
    </ConfigProvider>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTableContainer);
