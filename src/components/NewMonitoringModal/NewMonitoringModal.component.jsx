import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

import NewMonitoringModalSkeleton from './NewMonitoringModalSkeleton'
import NewMonitoringModalList from './NewMonitoringModalTaskList'
import { taskShape } from './propTypes'

import './styles.less'

const NewMonitoringModalContainer = ({
  isAddingMonitorings,
  isLoadingTasks,
  isShowing,
  handleAddMonitorings,
  handleHideModal,
  tasks,
}) => {
  const [selectedTasks, setSelectedTasks] = useState([])

  const hasNoSelectedTasks = useMemo(() => {
    return selectedTasks.length === 0
  }, [selectedTasks])

  const handleUnselectTask = (monitoringType) => {
    setSelectedTasks((currentSelectedArray) => {
      const indexToRemove = currentSelectedArray.indexOf(monitoringType)
      const selectedArrayClone = [...currentSelectedArray]
      selectedArrayClone.splice(indexToRemove, 1)
      return selectedArrayClone
    })
  }

  const handleSelectTask = (monitoringType) => {
    setSelectedTasks((currentSelectedArray) => {
      return [...currentSelectedArray, monitoringType]
    })
  }

  const handleClickOkButton = () => {
    handleAddMonitorings(selectedTasks)
    handleHideModal()
  }

  return (
    <Modal
      wrapClassName="new-monitoring-modal"
      title="Escolha um ou mais Tipos de Monitoramento"
      okText="Adicionar Monitoramento"
      bodyStyle={{ padding: '16px' }}
      cancelText="Cancelar"
      width={1000}
      onCancel={handleHideModal}
      onOk={handleClickOkButton}
      visible={isShowing}
      okButtonProps={{
        disabled: isLoadingTasks || hasNoSelectedTasks,
        loading: isAddingMonitorings,
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

NewMonitoringModalContainer.propTypes = {
  isAddingMonitorings: PropTypes.bool,
  isLoadingTasks: PropTypes.bool,
  isShowing: PropTypes.bool,
  handleAddMonitorings: PropTypes.func,
  handleHideModal: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskShape)),
}

NewMonitoringModalContainer.defaultProps = {
  isAddingMonitorings: false,
  isLoadingTasks: false,
  isShowing: false,
  handleAddMonitorings: undefined,
  handleHideModal: undefined,
  tasks: []
}

export default NewMonitoringModalContainer