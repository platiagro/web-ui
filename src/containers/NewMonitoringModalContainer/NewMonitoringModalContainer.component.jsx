import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { fetchTasks, TASKS_TYPES } from 'store/tasks';
import NewMonitoringModal from 'components/NewMonitoringModal';
import { createMultipleMonitorings } from 'store/monitorings/actions';

const creatingMonitoringSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.creating;
};

const tasksSelector = ({ tasksReducer }) => {
  return tasksReducer.tasks;
};

const NewMonitoringModalContainer = ({
  projectId,
  deploymentId,
  isShowing,
  handleHideModal,
}) => {
  const dispatch = useDispatch();

  const isCreatingMonitorings = useSelector(creatingMonitoringSelector);
  const tasks = useSelector(tasksSelector);

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

    dispatch(createMultipleMonitorings(requestDataArray));
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
      isCreatingMonitorings={isCreatingMonitorings}
      isLoadingTasks={isLoadingTasks}
      isShowing={isShowing}
      handleAddMonitorings={handleAddMonitorings}
      handleHideModal={handleHideModal}
      tasks={tasks}
    />
  );
};

NewMonitoringModalContainer.propTypes = {
  isShowing: PropTypes.bool,
  handleHideModal: PropTypes.bool,
  projectId: PropTypes.string,
  deploymentId: PropTypes.string,
};

NewMonitoringModalContainer.defaultProps = {
  isShowing: false,
  handleHideModal: undefined,
  projectId: undefined,
  deploymentId: undefined,
};

export default NewMonitoringModalContainer;
