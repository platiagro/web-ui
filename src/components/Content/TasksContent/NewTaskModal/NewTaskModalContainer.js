import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import {
  TASKS_TYPES,
  addTask,
  closeTasksModal,
  errorMessageSelector,
  newTaskRecordSelector,
  modalIsVisibleSelector,
  modalValidateStatusSelector,
} from 'store/tasks';

import NewTaskModal from './index';

const tasksSelector = ({ tasksReducer }) => {
  const tasks = tasksReducer.tasks || [];

  const filteredTasks = tasks
    .filter((itemTask) => !itemTask.tags.includes('DATASETS'))
    .sort((a, b) => a.name.localeCompare(b.name));

  filteredTasks.push({
    uuid: 'uuid',
    name: 'Template em branco',
  });

  return filteredTasks;
};

const NewTaskModalContainer = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(tasksSelector);
  const visible = useSelector(modalIsVisibleSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const copyTaskRecord = useSelector(newTaskRecordSelector);
  const modalValidateStatus = useSelector(modalValidateStatusSelector);

  const isAddingTask = useIsLoading(TASKS_TYPES.ADD_TASK_REQUEST);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const handleCloseTasksModal = () => {
    dispatch(closeTasksModal());
  };

  return (
    <NewTaskModal
      visible={visible}
      templates={tasks}
      loading={isAddingTask}
      errorMessage={errorMessage}
      copyTaskRecord={copyTaskRecord}
      modalValidateStatus={modalValidateStatus}
      handleNewTask={handleAddTask}
      handleCloseModal={handleCloseTasksModal}
    />
  );
};

export default NewTaskModalContainer;
