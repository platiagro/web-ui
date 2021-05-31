import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import {
  TASKS_TYPES,
  deleteTask,
  updateTask,
  fetchTaskData,
  clearTaskData,
  getTaskData,
  sendTaskViaEmail,
  uploadTaskExperimentNotebook,
  uploadTaskDeploymentNotebook,
} from 'store/tasks';
import { useIsLoading, useBooleanState } from 'hooks';
import { ShareTaskModal, NotebooksExplanationModal } from 'components';

import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskDetailsUploads from './TaskDetailsUploads';
import TaskDetailsNotebooks from './TaskDetailsNotebooks';
import TaskDetailsInfoFooter from './TaskDetailsInfoFooter';

import './TaskDetails.style.less';
import TaskDetailsDocker from './TaskDetailsDocker';

const TaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const taskData = useSelector(getTaskData);

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

  const handleUploadExperimentNotebook = (fileInstance) => {
    dispatch(
      uploadTaskExperimentNotebook(taskId, fileInstance, () => {
        setUploadedFiles((currentFiles) => [...currentFiles, fileInstance]);
      })
    );
  };

  const handleUploadDeploymentNotebook = (fileInstance) => {
    dispatch(
      uploadTaskDeploymentNotebook(taskId, fileInstance, () => {
        setUploadedFiles((currentFiles) => [...currentFiles, fileInstance]);
      })
    );
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
    if (!taskData) return;

    const taskWithNewName = {
      ...taskData,
      name: taskName,
    };

    dispatch(updateTask(taskId, taskWithNewName));
  };

  const handleUpdateTaskData = (field, value) => {
    if (!taskData) return;
    const taskDataToUpdate = { [field]: value };
    const successCallback = () => setHasEditedSomething(true);
    dispatch(updateTask(taskId, taskDataToUpdate, successCallback));
  };

  const handleSendTaskCopyToEmail = (email) => {
    dispatch(sendTaskViaEmail(taskId, email, handleHideShareTaskModal));
  };

  useEffect(() => {
    if (taskId) dispatch(fetchTaskData(taskId));
    return () => {
      dispatch(clearTaskData());
    };
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
        taskData={taskData}
        isEditingTask={isEditingTask}
        handleDeleteTask={handleDeleteTask}
        hasEditedSomething={hasEditedSomething}
        handleEditTaskName={handleEditTaskName}
        handleShowShareTaskModal={handleShowShareTaskModal}
      />

      <div className='task-details-page-content'>
        <div className='task-details-page-content-panels'>
          <TaskDetailsForm
            taskData={taskData}
            handleUpdateTaskData={handleUpdateTaskData}
          />

          <div className='task-details-page-content-info'>
            {taskData?.type === 'docker' ? (
              // TODO: "taskData.type" does not exist. Find other way to check if is a docker task
              <TaskDetailsDocker
                taskData={taskData}
                handleUpdateTaskData={handleUpdateTaskData}
              />
            ) : (
              <>
                <TaskDetailsNotebooks
                  isUploadingDeploymentNotebook={isUploadingDeploymentNotebook}
                  isUploadingExperimentNotebook={isUploadingExperimentNotebook}
                  handleShowNotebooksModal={handleShowNotebooksModal}
                  handleOpenDeploymentNotebook={handleOpenDeploymentNotebook}
                  handleOpenExperimentNotebook={handleOpenExperimentNotebook}
                  handleUploadDeploymentNotebook={
                    handleUploadDeploymentNotebook
                  }
                  handleUploadExperimentNotebook={
                    handleUploadExperimentNotebook
                  }
                />

                <TaskDetailsUploads uploadedFiles={uploadedFiles} />
              </>
            )}

            <TaskDetailsInfoFooter hasEditedSomething={hasEditedSomething} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
