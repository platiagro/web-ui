// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewTaskButton from './index';

// ACTIONS
import { showTasksModal } from '../../../../store/tasks/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowTasksModal: () => dispatch(showTasksModal()),
  };
};

/**
 * New Task Button Container.
 * This component is responsible for create a logic container for new task
 * button with redux.
 */
const NewProjectButtonContainer = ({ handleShowTasksModal }) => {
  // RENDER
  return <NewTaskButton disabled={false} handleClick={handleShowTasksModal} />;
};

// EXPORT
export default connect(null, mapDispatchToProps)(NewProjectButtonContainer);
