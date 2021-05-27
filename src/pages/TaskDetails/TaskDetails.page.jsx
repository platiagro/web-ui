import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useIsLoading, useToggleState } from 'hooks';
import { ShareTaskModal, NotebooksExplanationModal } from 'components';

import TaskDetailsForm from './TaskDetailsForm';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskDetailsUploads from './TaskDetailsUploads';
import TaskDetailsNotebooks from './TaskDetailsNotebooks';
import TaskDetailsInfoFooter from './TaskDetailsInfoFooter';

import './TaskDetails.style.less';
import { useDispatch } from 'react-redux';

const TaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const [hasEditedSomething, setHasEditedSomething] = useState(false);

  const [isShowingNotebooksModal, handleToggleNotebooksModal] =
    useToggleState(false);

  const [isShowingShareTaskModal, handleToggleShareTaskModal] =
    useToggleState(false);

  const isEditingTask = useIsLoading('editing');
  const isUploadingExperimentNotebook = useIsLoading('uploading');
  const isUploadingDeploymentNotebook = useIsLoading('uploading');

  const handleUploadExperimentNotebook = () => {};

  const handleOpenExperimentNotebook = () => {};

  const handleOpenDeploymentNotebook = () => {};

  const handleUploadDeploymentNotebook = () => {};

  const handleDeleteTask = () => {};

  const handleEditTaskName = () => {};

  const handleSendTaskCopyToEmail = (email) => {
    console.log(email);
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
        handleHideModal={handleToggleNotebooksModal}
      />

      <ShareTaskModal
        isShowingModal={isShowingShareTaskModal}
        handleHideModal={handleToggleShareTaskModal}
        handleSendTaskCopyToEmail={handleSendTaskCopyToEmail}
      />

      <TaskDetailsHeader
        isEditingTask={isEditingTask}
        handleDeleteTask={handleDeleteTask}
        hasEditedSomething={hasEditedSomething}
        handleEditTaskName={handleEditTaskName}
        handleToggleShareTaskModal={handleToggleShareTaskModal}
      />

      <div className='task-details-page-content'>
        <div className='task-details-page-content-panels'>
          <TaskDetailsForm setHasEditedSomething={setHasEditedSomething} />

          <div className='task-details-page-content-info'>
            <TaskDetailsNotebooks
              isUploadingDeploymentNotebook={isUploadingDeploymentNotebook}
              isUploadingExperimentNotebook={isUploadingExperimentNotebook}
              handleToggleNotebooksModal={handleToggleNotebooksModal}
              handleOpenDeploymentNotebook={handleOpenDeploymentNotebook}
              handleOpenExperimentNotebook={handleOpenExperimentNotebook}
              handleUploadDeploymentNotebook={handleUploadDeploymentNotebook}
              handleUploadExperimentNotebook={handleUploadExperimentNotebook}
            />

            <TaskDetailsUploads />
            <TaskDetailsInfoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
