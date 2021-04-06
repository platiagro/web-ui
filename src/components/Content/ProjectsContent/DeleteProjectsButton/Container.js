// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DeleteProjectsButton from './index';

// ACTIONS
import { Actions as projectsActions} from 'store/Projects';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  const { deleteSelectedProjects } = projectsActions;

  return {
    handleDeleteSelectedProjects: (searchText, selectedProjects) =>
      dispatch(deleteSelectedProjects(searchText, selectedProjects)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.projectsTable.loading,
    selectedProjects: state.projectsReducer.selectedProjects,
    searchText: state.projectsReducer.searchText,
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
  searchText,
  handleDeleteSelectedProjects,
}) => {
  const handleClick = (projects) => {
    handleDeleteSelectedProjects(searchText, projects);
  };

  // RENDER
  return (
    <>
      {selectedProjects.length > 0 ? (
        <DeleteProjectsButton
          disabled={loading}
          selectedProjects={selectedProjects}
          handleClick={handleClick}
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
