import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { TASK_CATEGORIES } from 'configs';
import { TasksEmptyPlaceholder } from 'components/EmptyPlaceholders';
import { TASKS_TYPES, deleteTask, fetchTasks, createTask } from 'store/tasks';

import TasksTable from './index';
import { useHistory } from 'react-router';

const tasksSelector = ({ tasksReducer }) => {
  const tasks = tasksReducer.tasks || [];
  return tasks.filter((task) => {
    return task.tags.indexOf(TASK_CATEGORIES.DATASETS) <= -1;
  });
};

const TasksTableContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tasks = useSelector(tasksSelector);

  const isLoadingOrDeleting = useIsLoading(
    TASKS_TYPES.FETCH_TASKS_REQUEST,
    TASKS_TYPES.DELETE_TASK_REQUEST
  );

  const handleSeeTaskCode = (taskName) => {
    window.open(
      `/jupyterlab/tree/tasks/${taskName}/?reset&open=Experiment.ipynb,Deployment.ipynb`
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCopyTask = (task) => {
    const taskCopy = {
      ...task,
      name: `${task.name} Cópia`,
      copyFrom: task.uuid,
    };

    delete taskCopy.uuid;

    dispatch(
      createTask(taskCopy, (newTask) => {
        history.push(`/tarefas/${newTask.uuid}`);
      })
    );
  };

  const handleOpenTaskDetails = (task) => {
    history.push(`/tarefas/${task.uuid}`);
  };

  useLayoutEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return isLoadingOrDeleting || tasks.length > 0 ? (
    <div className='tasksContainer'>
      <TasksTable
        tasks={tasks}
        isLoading={isLoadingOrDeleting}
        handleCopyTask={handleCopyTask}
        handleDeleteTask={handleDeleteTask}
        handleSeeTaskCode={handleSeeTaskCode}
        handleOpenTaskDetails={handleOpenTaskDetails}
      />
    </div>
  ) : (
    <TasksEmptyPlaceholder />
  );
};

export default TasksTableContainer;
