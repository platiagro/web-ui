// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DeleteProjectsButton from './index';

// ACTIONS
import { deleteSelectedProjects } from '../../../../store/projects/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteSelectedProjects: (selectedProjects) =>
      dispatch(deleteSelectedProjects(selectedProjects)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.projectsTable.loading,
    selectedProjects: state.projectsReducer.selectedProjects,
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
      {selectedProjects.length > 0 ? (
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
