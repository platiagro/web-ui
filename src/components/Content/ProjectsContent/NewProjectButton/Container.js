// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewProjectButton from './index';

// ACTIONS
import { showNewProjectModal } from '../../../../store/ui/actions';
import { Selectors as projectsSelectors } from 'store/Projects';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show new project modal
    handleShowNewProjectModal: () => dispatch(showNewProjectModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  const { getIsLoading } = projectsSelectors;

  return {
    loading: getIsLoading(state),
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
