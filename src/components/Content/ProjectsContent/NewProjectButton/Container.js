// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewProjectButton from './index';

// ACTIONS
import { showNewProjectModal } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowNewProjectModal: () => dispatch(showNewProjectModal()),
  };
};

/**
 * New Project Button Container.
 * This component is responsible for create a logic container for new project
 * button with redux.
 */
const NewProjectButtonContainer = ({ handleShowNewProjectModal }) => {
  // RENDER
  return (
    <NewProjectButton
      disabled={false}
      handleClick={handleShowNewProjectModal}
    />
  );
};

// EXPORT
export default connect(null, mapDispatchToProps)(NewProjectButtonContainer);
