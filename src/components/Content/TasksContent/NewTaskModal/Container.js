// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

// ACTIONS
import { addTask, closeTasksModal } from '../../../../store/tasks/actions';

// COMPONENTS
import NewTaskModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (taskValues) => {
      return dispatch(addTask(taskValues));
    },
    handleCloseTasksModal: () => {
      return dispatch(closeTasksModal());
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    visible: state.tasks.modalIsVisible,
    loading: state.ui.tasksTable.loading,
    modalValidateStatus: state.tasks.modalValidateStatus,
    errorMessage: state.tasks.errorMessage,
  };
};

/**
 * New Task Modal Container.
 * This component is responsible for create a logic container for new Task modal
 * with redux.
 */
const NewTaskModalContainer = (props) => {
  // states
  const { tasks, visible, loading, modalValidateStatus, errorMessage } = props;
  // dispatchs
  const { handleAddTask, handleCloseTasksModal } = props;

  const templates = [...tasks];
  templates.sort((a, b) => a.name.localeCompare(b.name));
  templates.push({
    uuid: 'uuid',
    name: 'Template em branco',
  });

  // RENDER
  return (
    <NewTaskModal
      visible={visible}
      templates={templates}
      handleCloseModal={handleCloseTasksModal}
      handleNewTask={handleAddTask}
      loading={loading}
      modalValidateStatus={modalValidateStatus}
      errorMessage={errorMessage}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskModalContainer);
