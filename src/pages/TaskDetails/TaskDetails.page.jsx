import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { deleteTask, TASKS_TYPES, updateTask } from 'store/tasks';
import { useIsLoading, useBooleanState } from 'hooks';
import { ShareTaskModal, NotebooksExplanationModal } from 'components';

import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskDetailsUploads from './TaskDetailsUploads';
import TaskDetailsNotebooks from './TaskDetailsNotebooks';
import TaskDetailsInfoFooter from './TaskDetailsInfoFooter';

import './TaskDetails.style.less';

const taskDataSelector = () => {
  return {};
};

const TaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const taskData = useSelector(taskDataSelector);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [hasEditedSomething, setHasEditedSomething] = useState(false);

  const [
    isShowingNotebooksModal,
    handleShowNotebooksModal,
    handleHideNotebooksModal,
  ] = useBooleanState(false);

  const [
    isShowingShareTaskModal,
    handleShowShareTaskModal,
    handleHideShareTaskModal,
  ] = useBooleanState(false);

  const isEditingTask = useIsLoading(TASKS_TYPES.UPDATE_TASK_REQUEST);

  const isSendingTaskViaEmail = useIsLoading(
    TASKS_TYPES.SEND_TASK_VIA_EMAIL_REQUEST
  );

  const isUploadingExperimentNotebook = useIsLoading(
    TASKS_TYPES.UPLOAD_TASK_EXPERIMENT_NOTEBOOK_REQUEST
  );

  const isUploadingDeploymentNotebook = useIsLoading(
    TASKS_TYPES.UPLOAD_TASK_DEPLOYMENT_NOTEBOOK_REQUEST
  );

  const handleUploadExperimentNotebook = () => {
    setUploadedFiles([]);
  };

  const handleUploadDeploymentNotebook = () => {
    setUploadedFiles([]);
  };

  const handleOpenExperimentNotebook = () => {
    if (!taskData?.name) return;

    window.open(
      `/jupyterlab/tree/tasks/${taskData.name}/?reset&open=Experiment.ipynb`
    );
  };

  const handleOpenDeploymentNotebook = () => {
    if (!taskData?.name) return;

    window.open(
      `/jupyterlab/tree/tasks/${taskData.name}/?reset&open=Deployment.ipynb`
    );
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask(taskId, () => {
        if (history.length === 0) history.push('/tarefas');
        else history.goBack();
      })
    );
  };

  const handleEditTaskName = (taskName) => {
    const taskWithNewName = {
      ...taskData,
      name: taskName,
    };

    dispatch(updateTask(taskId, taskWithNewName));
  };

  const handleUpdateTaskData = (field, value) => {
    const taskWithUpdatedData = {
      ...taskData,
      [field]: value,
    };

    dispatch(updateTask(taskId, taskWithUpdatedData));
  };

  const handleSendTaskCopyToEmail = (email) => {
    console.log(email);
    handleHideShareTaskModal();
  };

  useLayoutEffect(() => {
    if (taskId) {
      dispatch({ type: 'pow' });
    }
  }, [dispatch, taskId]);

  return (
    <div className='task-details-page'>
      <NotebooksExplanationModal
        isShowingModal={isShowingNotebooksModal}
        handleHideModal={handleHideNotebooksModal}
      />

      <ShareTaskModal
        isShowingModal={isShowingShareTaskModal}
        isSendingTaskViaEmail={isSendingTaskViaEmail}
        handleHideModal={handleHideShareTaskModal}
        handleSendTaskCopyToEmail={handleSendTaskCopyToEmail}
      />

      <TaskDetailsHeader
        isEditingTask={isEditingTask}
        handleDeleteTask={handleDeleteTask}
        hasEditedSomething={hasEditedSomething}
        handleEditTaskName={handleEditTaskName}
        handleShowShareTaskModal={handleShowShareTaskModal}
      />

      <div className='task-details-page-content'>
        <div className='task-details-page-content-panels'>
          <TaskDetailsForm
            setHasEditedSomething={setHasEditedSomething}
            handleUpdateTaskData={handleUpdateTaskData}
          />

          <div className='task-details-page-content-info'>
            <TaskDetailsNotebooks
              isUploadingDeploymentNotebook={isUploadingDeploymentNotebook}
              isUploadingExperimentNotebook={isUploadingExperimentNotebook}
              handleShowNotebooksModal={handleShowNotebooksModal}
              handleOpenDeploymentNotebook={handleOpenDeploymentNotebook}
              handleOpenExperimentNotebook={handleOpenExperimentNotebook}
              handleUploadDeploymentNotebook={handleUploadDeploymentNotebook}
              handleUploadExperimentNotebook={handleUploadExperimentNotebook}
            />

            <TaskDetailsUploads uploadedFiles={uploadedFiles} />

            <TaskDetailsInfoFooter hasEditedSomething={hasEditedSomething} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
