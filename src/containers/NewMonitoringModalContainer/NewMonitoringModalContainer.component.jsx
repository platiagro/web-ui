import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTasks } from 'store/tasks/actions'
import NewMonitoringModal from 'components/NewMonitoringModal'
import { createMonitoring } from 'store/monitorings/actions'

const addingMonitoringSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.adding
}

const tasksLoadingSelector = ({ uiReducer }) => {
  return uiReducer.tasksTable.loading
}

const tasksSelector = ({ tasksReducer }) => {
  return tasksReducer.tasks
}

const NewMonitoringModalContainer = ({
  projectId,
  deploymentId,
  isShowing,
  handleHideModal,
}) => {
  const dispatch = useDispatch()

  const isAddingMonitorings = useSelector(addingMonitoringSelector)
  const isLoadingTasks = useSelector(tasksLoadingSelector)
  const tasks = useSelector(tasksSelector)

  const handleAddMonitorings = (selectedTasks) => {
    if (!projectId || !deploymentId) return

    const hasNoSelectedTasks = !selectedTasks || selectedTasks.length === 0
    if (hasNoSelectedTasks) return

    selectedTasks.forEach((task) => {
      dispatch(createMonitoring({
        taskId: task.uuid,
        projectId,
        deploymentId,
      }))
    })
  }

  // Always fetch tasks when open the modal 
  useEffect(() => {
    if (isShowing) dispatch(fetchTasks())
  }, [dispatch, isShowing])

  return (
    <NewMonitoringModal
      isAddingMonitorings={isAddingMonitorings}
      isLoadingTasks={isLoadingTasks}
      isShowing={isShowing}
      handleAddMonitorings={handleAddMonitorings}
      handleHideModal={handleHideModal}
      tasks={tasks}
    />
  )
}

NewMonitoringModalContainer.propTypes = {
  isShowing: PropTypes.bool,
  handleHideModal: PropTypes.bool,
  projectId: PropTypes.string,
  deploymentId: PropTypes.string,
}

NewMonitoringModalContainer.defaultProps = {
  isShowing: false,
  handleHideModal: undefined,
  projectId: undefined,
  deploymentId: undefined,
}

export default NewMonitoringModalContainer