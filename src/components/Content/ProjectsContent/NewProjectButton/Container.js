// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewProjectButton from './index';

// ACTIONS
import { fetchShowNewProjectModall } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowNewProjectModal: () => dispatch(fetchShowNewProjectModall()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.projectsTable.loading,
  };
};

/**
 * New Project Button Container.
 * This component is responsible for create a logic container for new project
 * button with redux.
 */
const NewProjectButtonContainer = ({ loading, handleShowNewProjectModal }) => {
  // RENDER
  return (
    <NewProjectButton
      disabled={loading}
      handleClick={handleShowNewProjectModal}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProjectButtonContainer);
