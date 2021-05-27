import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { TASK_CATEGORIES } from 'configs';
import { getTasks, fetchTasks, addTask, TASKS_TYPES } from 'store/tasks';

import NewTaskList from './NewTaskList.';
import NewTaskHeader from './NewTaskHeader';
import NewTaskSkeleton from './NewTaskSkeleton';
import NewTaskDefaultTemplates from './NewTaskDefaultTemplates';
import NewTaskMarketplacePanel from './NewTaskMarketplacePanel';

import './NewTask.style.less';

const NewTask = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const tasks = useSelector(getTasks);
  const isLoadingTasks = useIsLoading(TASKS_TYPES.FETCH_TASKS_REQUEST);

  const tasksGroupedByCategory = useMemo(() => {
    return Object.values(TASK_CATEGORIES).map((category) => {
      const tasksOfThisCategory = tasks.filter((task) => {
        return !!task.tags && task.tags.includes(category.key);
      });

      return {
        key: category.key,
        name: category.name,
        tasks: tasksOfThisCategory,
      };
    });
  }, [tasks]);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoToMarketPlace = () => {
    history.push('/marketplace'); // TODO: Put the correct route path here
  };

  const handleCreateBlankTask = () => {
    const newTask = { name: 'Tarefa em Branco' };
    dispatch(addTask(newTask), (newTask) => {
      history.push(`/tarefa/${newTask.uuid}`);
    });
  };

  const handleCreateDockerTask = () => {
    const newTask = {
      name: 'Tarefa com Docker',
      image: 'your-custom-docker-image:tag',
    };

    dispatch(addTask(newTask), (newTask) => {
      history.push(`/tarefa/${newTask.uuid}`);
    });
  };

  const handleCreateTaskCopy = (task) => {
    const taskCopy = {
      ...task,
      name: `${task.name} Cópia`,
      copyFrom: task.uuid,
    };

    delete taskCopy.uuid;

    dispatch(addTask(taskCopy), (newTask) => {
      history.push(`/tarefa/${newTask.uuid}`);
    });
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className='new-task-page'>
      <NewTaskHeader handleGoBack={handleGoBack} />

      <div className='new-task-page-content'>
        <div className='new-task-page-content-panels'>
          <div className='new-task-page-content-panels-left'>
            <NewTaskDefaultTemplates
              handleCreateBlankTask={handleCreateBlankTask}
              handleCreateDockerTask={handleCreateDockerTask}
            />

            <NewTaskList
              isLoadingTasks={isLoadingTasks}
              handleCreateTaskCopy={handleCreateTaskCopy}
              tasksGroupedByCategory={tasksGroupedByCategory}
            />

            {isLoadingTasks && <NewTaskSkeleton />}
          </div>

          <NewTaskMarketplacePanel
            handleGoToMarketPlace={handleGoToMarketPlace}
          />
        </div>
      </div>
    </div>
  );
};

export default NewTask;
