// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

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
    tasks: state.tasksReducer.tasks,
    visible: state.tasksReducer.modalIsVisible,
    loading: state.uiReducer.tasksTable.loading,
    modalValidateStatus: state.tasksReducer.modalValidateStatus,
    errorMessage: state.tasksReducer.errorMessage,
    copyTaskRecord: state.tasksReducer.newTaskRecord,
  };
};

/**
 * New Task Modal Container.
 * This component is responsible for create a logic container for new Task modal
 * with redux.
 *
 * @param props
 */
const NewTaskModalContainer = (props) => {
  // states
  const {
    tasks,
    visible,
    loading,
    modalValidateStatus,
    errorMessage,
    copyTaskRecord,
  } = props;
  // dispatchs
  const { handleAddTask, handleCloseTasksModal } = props;

  // filter tasks not is datasets
  const templates = tasks.filter(
    (itemTask) => !itemTask.tags.includes('DATASETS')
  );

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
      copyTaskRecord={copyTaskRecord}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskModalContainer);
