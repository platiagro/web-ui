// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DeleteProjectsButton from './index';

// ACTIONS
import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
} from 'store/Projects';

const { deleteProjectsRequest } = projectsActions;

// DISPATCHS
const mapDispatchToProps = {
  handleDeleteSelectedProjects: deleteProjectsRequest,
};

// STATES
const mapStateToProps = (state) => {
  const { getSelectedProjects, getIsLoading } = projectsSelectors;

  return {
    loading: getIsLoading(state),
    selectedProjects: getSelectedProjects(state),
  };
};

/**
 * Delete Projects Button Container.
 * This component is responsible for create a logic container for delete projects
 * button with redux.
 */
const DeleteProjectsButtonContainer = ({
  loading,
  selectedProjects,
  handleDeleteSelectedProjects,
}) => {
  // RENDER
  return (
    <>
      {selectedProjects?.length > 0 ? (
        <DeleteProjectsButton
          disabled={loading}
          selectedProjects={selectedProjects}
          handleClick={handleDeleteSelectedProjects}
        />
      ) : null}
    </>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteProjectsButtonContainer);
