import { useIsLoading } from 'hooks';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  TASKS_TYPES,
  updateTask,
  closeTasksModal,
  errorMessageSelector,
  newTaskRecordSelector,
  editModalIsVisibleSelector,
  modalValidateStatusSelector,
} from 'store/tasks';

import EditTaskModal from './index';

const EditTaskModalContainer = () => {
  const dispatch = useDispatch();

  const errorMessage = useSelector(errorMessageSelector);
  const visible = useSelector(editModalIsVisibleSelector);
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
