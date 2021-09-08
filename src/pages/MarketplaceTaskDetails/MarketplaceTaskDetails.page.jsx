import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  createTask,
  getTaskData,
  TASKS_TYPES,
  fetchTaskData,
} from 'store/tasks';
import { useIsLoading } from 'hooks';

import MarketplaceTaskDetailsData from './MarketplaceTaskDetailsData';
import MarketplaceTaskDetailsHeader from './MarketplaceTaskDetailsHeader';
import MarketplaceTaskDetailsChanges from './MarketplaceTaskDetailsChanges';

import './MarketplaceTaskDetails.style.less';

const MarketplaceTaskDetails = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const taskData = useSelector(getTaskData);

  const isCopyingTask = useIsLoading(TASKS_TYPES.COPY_TASK_REQUEST);
  const isLoadingTask = useIsLoading(TASKS_TYPES.FETCH_TASK_DATA_REQUEST);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleCopyTask = () => {
    const taskCopy = { ...taskData, copyFrom: taskData.uuid };
    delete taskCopy.uuid;
    dispatch(createTask(taskCopy));
  };

  useEffect(() => {
    dispatch(fetchTaskData(taskId));
  }, [dispatch, taskId]);

  return (
    <div className='marketplace-task-details'>
      <MarketplaceTaskDetailsHeader handleGoBack={handleGoBack} />

      <div className='marketplace-task-details-content'>
        <MarketplaceTaskDetailsData
          taskData={taskData}
          isLoadingTask={isLoadingTask}
          isCopyingTask={isCopyingTask}
          handleCopyTask={handleCopyTask}
        />

        <MarketplaceTaskDetailsChanges
          taskData={taskData}
          isLoadingTask={isLoadingTask}
        />
      </div>
    </div>
  );
};

export default MarketplaceTaskDetails;
