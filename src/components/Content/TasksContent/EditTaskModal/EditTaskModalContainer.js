import { useIsLoading } from 'hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateTask, closeTasksModal, TASKS_TYPES } from 'store/tasks';

import EditTaskModal from './index';

const visibleSelector = ({ tasksReducer }) => {
  return tasksReducer.editModalIsVisible;
};

const errorMessageSelector = ({ tasksReducer }) => {
  return tasksReducer.errorMessage;
};

const newTaskRecordSelector = ({ tasksReducer }) => {
  return tasksReducer.newTaskRecord;
};

const modalValidateStatusSelector = ({ tasksReducer }) => {
  return tasksReducer.modalValidateStatus;
};

const EditTaskModalContainer = () => {
  const dispatch = useDispatch();

  const visible = useSelector(visibleSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const newTaskRecord = useSelector(newTaskRecordSelector);
  const modalValidateStatus = useSelector(modalValidateStatusSelector);

  const isUpdating = useIsLoading(TASKS_TYPES.UPDATE_TASK_REQUEST);

  const handleUpdateTask = (uuid, taskValues) => {
    dispatch(updateTask(uuid, taskValues));
  };

  const handleCloseTasksModal = () => {
    dispatch(closeTasksModal());
  };

  return (
    <EditTaskModal
      visible={visible}
      loading={isUpdating}
      errorMessage={errorMessage}
      initialValues={newTaskRecord}
      modalValidateStatus={modalValidateStatus}
      handleEditTask={handleUpdateTask}
      handleCloseModal={handleCloseTasksModal}
    />
  );
};

export default EditTaskModalContainer;
