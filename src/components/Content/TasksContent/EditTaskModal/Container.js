// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

// ACTIONS
import { updateTask } from '../../../../store/tasks/actions';

// COMPONENTS
import EditTaskModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdateTask: (uuid, taskValues) => {
      return dispatch(updateTask(uuid, taskValues));
    },
  };
};

/**
 * Edit Task Modal Container.
 * This component is responsible for create a logic container for edit task modal
 * with redux.
 */
const NewTaskModalContainer = (props) => {
  const { visible, initialValues } = props;
  const { handleUpdateTask, handleCloseModal } = props;

  // RENDER
  return (
    <EditTaskModal
      visible={visible}
      initialValues={initialValues}
      handleCloseModal={handleCloseModal}
      handleEditTask={(uuid, taskValues) =>
        handleUpdateTask(uuid, taskValues).then(async (response) => {
          if (response) {
            handleCloseModal();
            message.success(`Alteração realizada com sucesso.`);
          }
        })
      }
    />
  );
};

// EXPORT
export default connect(null, mapDispatchToProps)(NewTaskModalContainer);
