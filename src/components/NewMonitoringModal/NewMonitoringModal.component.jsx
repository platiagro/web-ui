import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

import NewMonitoringModalSkeleton from './NewMonitoringModalSkeleton'
import NewMonitoringModalList from './NewMonitoringModalTaskList'
import { taskShape } from './propTypes'

import './styles.less'

const NewMonitoringModal = ({
  isCreatingMonitorings,
  isLoadingTasks,
  isShowing,
  handleAddMonitorings,
  handleHideModal,
  tasks,
}) => {
  const [selectedTasks, setSelectedTasks] = useState([])
  const [wasOkButtonClicked, setWasOkButtonClicked] = useState(false)

  const isOkButtonDisabled = useMemo(() => {
    const hasNoSelectedTasks = selectedTasks.length === 0
    return isLoadingTasks || isCreatingMonitorings || hasNoSelectedTasks
  }, [isCreatingMonitorings, isLoadingTasks, selectedTasks.length])

  const okButtonText = useMemo(() => {
    const numberOfMonitorings = selectedTasks.length
    if (numberOfMonitorings < 2) return 'Adicionar Monitoramento'
    return `Adicionar Monitoramentos (${numberOfMonitorings})`
  }, [selectedTasks.length])

  const handleUnselectTask = (monitoringType) => {
    if (isCreatingMonitorings) return
    setSelectedTasks((currentSelectedArray) => {
      const indexToRemove = currentSelectedArray.indexOf(monitoringType)
      const selectedArrayClone = [...currentSelectedArray]
      selectedArrayClone.splice(indexToRemove, 1)
      return selectedArrayClone
    })
  }

  const handleSelectTask = (monitoringType) => {
    if (isCreatingMonitorings) return
    setSelectedTasks((currentSelectedArray) => {
      return [...currentSelectedArray, monitoringType]
    })
  }

  const handleClickOkButton = () => {
    handleAddMonitorings(selectedTasks)
    setWasOkButtonClicked(true)
  }

  // Clear internal state when closes the modal
  useEffect(() => {
    if (!isShowing) {
      setSelectedTasks([])
      setWasOkButtonClicked(false)
    }
  }, [isShowing])

  // Hides the modal after clicking the OK button 
  // and the API creates the monitorings 
  useEffect(() => {
    const canHideModal = wasOkButtonClicked && !isCreatingMonitorings
    if (canHideModal) handleHideModal()
  }, [handleHideModal, isCreatingMonitorings, wasOkButtonClicked])

  return (
    <Modal
      wrapClassName="new-monitoring-modal"
      title="Escolha um ou mais Tipos de Monitoramento"
      okText={okButtonText}
      bodyStyle={{ padding: '16px' }}
      cancelText="Cancelar"
      width={1000}
      onCancel={handleHideModal}
      onOk={handleClickOkButton}
      visible={isShowing}
      okButtonProps={{
        disabled: isOkButtonDisabled,
        loading: isCreatingMonitorings,
      }}
      centered
    >
      {isLoadingTasks ? (
        <NewMonitoringModalSkeleton />
      ) : (
        <NewMonitoringModalList
          handleUnselectTask={handleUnselectTask}
          handleSelectTask={handleSelectTask}
          selectedTasks={selectedTasks}
          tasks={tasks}
        />
      )}
    </Modal>
  )
}

NewMonitoringModal.propTypes = {
  isCreatingMonitorings: PropTypes.bool,
  isLoadingTasks: PropTypes.bool,
  isShowing: PropTypes.bool,
  handleAddMonitorings: PropTypes.func,
  handleHideModal: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskShape)),
}

NewMonitoringModal.defaultProps = {
  isCreatingMonitorings: false,
  isLoadingTasks: false,
  isShowing: false,
  handleAddMonitorings: undefined,
  handleHideModal: undefined,
  tasks: []
}

export default NewMonitoringModal