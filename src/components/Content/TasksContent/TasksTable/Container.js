// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

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
  };
};

/**
 * Tasks Table Container.
 * This component is responsible for create a logic container for tasks table
 * with redux.
 */
const TasksTableContainer = (props) => {
  const { tasks } = props;
  const { handleClickEdit, handleFetchTasks, handleDeleteTask } = props;

  // Fetch tasks on component did mount
  useLayoutEffect(() => {
    handleFetchTasks();
  }, [handleFetchTasks]);

  // RENDER
  return tasks.length > 0 ? (
    <TasksTable
      tasks={tasks}
      handleClickTask={(uuid) => alert(uuid)}
      handleClickEdit={handleClickEdit}
      handleClickDelete={handleDeleteTask}
    />
  ) : (
    <TasksEmpty />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksTableContainer);
