import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { TasksEmptyPlaceholder } from 'components/EmptyPlaceholders';
import {
  TASKS_TYPES,
  deleteTask,
  fetchTasks,
  showEditTaskModal,
  showCopyTasksModal,
  getContainerState,
} from 'store/tasks';

import TasksTable from './index';

const tasksSelector = ({ tasksReducer }) => {
  const tasks = tasksReducer.tasks || [];
  return tasks.filter((task) => {
    return task.tags.indexOf('DATASETS') <= -1;
  });
};

const TasksTableContainer = () => {
  const dispatch = useDispatch();

  const containerState = useSelector(getContainerState);
  const tasks = useSelector(tasksSelector);

  const isLoadingOrDeleting = useIsLoading(
    TASKS_TYPES.FETCH_TASKS_REQUEST,
    TASKS_TYPES.DELETE_TASK_REQUEST
  );

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

  return isLoadingOrDeleting || tasks.length > 0 ? (
    <div className='tasksContainer'>
      <TasksTable
        tasks={tasks}
        loading={isLoadingOrDeleting}
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
