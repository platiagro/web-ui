// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { fetchUpdateTask, closeTasksModal } from '../../../../store/tasks/actions';

// COMPONENTS
import EditTaskModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateTask: (uuid, taskValues) => {
      return dispatch(fetchUpdateTask(uuid, taskValues));
    },
    handleCloseTasksModal: () => {
      return dispatch(closeTasksModal());
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    visible: state.tasksReducer.editModalIsVisible,
    loading: state.uiReducer.tasksTable.loading,
    newTaskRecord: state.tasksReducer.newTaskRecord,
    modalValidateStatus: state.tasksReducer.modalValidateStatus,
    errorMessage: state.tasksReducer.errorMessage,
  };
};

/**
 * Edit Task Modal Container.
 * This component is responsible for create a logic container for edit task modal
 * with redux.
 *
 * @param props
 */
const EditTaskModalContainer = (props) => {
  // states
  const {
    visible,
    loading,
    newTaskRecord,
    modalValidateStatus,
    errorMessage,
  } = props;
  const { handleUpdateTask, handleCloseTasksModal } = props;

  // RENDER
  return (
    <EditTaskModal
      visible={visible}
      initialValues={newTaskRecord}
      handleCloseModal={handleCloseTasksModal}
      handleEditTask={handleUpdateTask}
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
)(EditTaskModalContainer);
