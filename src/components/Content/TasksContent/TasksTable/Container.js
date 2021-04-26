import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { TasksEmptyPlaceholder } from 'components/EmptyPlaceholders';
import {
  FETCH_TASK,
  deleteTask,
  fetchTasks,
  showEditTaskModal,
  showCopyTasksModal,
} from 'store/tasks';

import TasksTable from './index';

const containerStateSelector = ({ tasksReducer }) => {
  return tasksReducer.containerState;
};

const tasksSelector = ({ tasksReducer }) => {
  const tasks = tasksReducer.tasks || [];
  return tasks.filter((task) => {
    return task.tags.indexOf('DATASETS') <= -1;
  });
};

const TasksTableContainer = () => {
  const dispatch = useDispatch();

  const containerState = useSelector(containerStateSelector);
  const tasks = useSelector(tasksSelector);

  const isLoadingTasks = useIsLoading(FETCH_TASK);

  const handleClickTask = (taskName) => {
    window.open(
      `/jupyterlab/tree/tasks/${taskName}/?reset&open=Experiment.ipynb,Deployment.ipynb`
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCopyTaskRequest = (record) => {
    dispatch(showCopyTasksModal(record));
  };

  const handleShowEditTaskModal = (record) => {
    dispatch(showEditTaskModal(record));
  };

  useLayoutEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return isLoadingTasks || tasks.length > 0 ? (
    <div className='tasksContainer'>
      <TasksTable
        tasks={tasks}
        loading={isLoadingTasks}
        containerState={containerState}
        handleClickTask={handleClickTask}
        handleClickDelete={handleDeleteTask}
        handleClickEdit={handleShowEditTaskModal}
        handleCopyTaskRequest={handleCopyTaskRequest}
      />
    </div>
  ) : (
    <TasksEmptyPlaceholder />
  );
};

export default TasksTableContainer;
