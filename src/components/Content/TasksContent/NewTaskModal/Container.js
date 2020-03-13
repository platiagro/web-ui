// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

// ACTIONS
import { addTask } from '../../../../store/tasks/actions';

// COMPONENTS
import NewTaskModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (taskValues) => {
      return dispatch(addTask(taskValues));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
  };
};

/**
 * New Task Modal Container.
 * This component is responsible for create a logic container for new Task modal
 * with redux.
 */
const NewTaskModalContainer = (props) => {
  const { tasks, visible } = props;
  const { handleAddTask, handleCloseModal } = props;

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

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
      handleCloseModal={handleCloseModal}
      handleNewTask={(taskValues) =>
        handleAddTask(taskValues).then(async (response) => {
          if (response) {
            handleCloseModal();
            message.success(`Tarefa adicionada com sucesso.`);
            await sleep(1000);
            window.open(`/notebook/anonymous/server`);
          }
        })
      }
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTaskModalContainer);
