import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  createMultipleMonitorings,
  MONITORINGS_TYPES,
} from 'store/monitorings';
import { useIsLoading } from 'hooks';
import NewMonitoringModal from 'components/NewMonitoringModal';
import { TASKS_TYPES, fetchTasks, getTasks } from 'store/tasks';

const NewMonitoringModalContainer = ({
  isShowing,
  handleHideModal,
  setIsShowingPanel,
}) => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const tasks = useSelector(getTasks);

  const isCreatingMonitorings = useIsLoading(
    MONITORINGS_TYPES.CREATE_MONITORINGS_REQUEST
  );

  const isLoadingTasks = useIsLoading(TASKS_TYPES.FETCH_TASKS_REQUEST);

  const handleAddMonitorings = (selectedTasks) => {
    if (!projectId || !deploymentId) return;

    const hasNoSelectedTasks = !selectedTasks || selectedTasks.length === 0;
    if (hasNoSelectedTasks) return;

    const requestDataArray = selectedTasks.map((task) => ({
      taskId: task.uuid,
      projectId,
      deploymentId,
    }));

    dispatch(
      createMultipleMonitorings(requestDataArray, () => {
        if (setIsShowingPanel) setIsShowingPanel(true);
      })
    );
  };

  // Always fetch tasks when open the modal
  useEffect(() => {
    if (isShowing) {
      dispatch(
        fetchTasks({
          tags: ['MONITORING'],
        })
      );
    }
  }, [dispatch, isShowing]);

  return (
    <NewMonitoringModal
      tasks={tasks}
      isShowing={isShowing}
      isLoadingTasks={isLoadingTasks}
      isCreatingMonitorings={isCreatingMonitorings}
      handleHideModal={handleHideModal}
      handleAddMonitorings={handleAddMonitorings}
    />
  );
};

NewMonitoringModalContainer.propTypes = {
  isShowing: PropTypes.bool,
  handleHideModal: PropTypes.func,
  setIsShowingPanel: PropTypes.func,
};

NewMonitoringModalContainer.defaultProps = {
  isShowing: false,
  handleHideModal: undefined,
  setIsShowingPanel: undefined,
};

export default NewMonitoringModalContainer;
