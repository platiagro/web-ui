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

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  const { deleteProjectsRequest } = projectsActions;

  return {
    handleDeleteSelectedProjects: (searchText, selectedProjects) =>
      dispatch(deleteProjectsRequest(searchText, selectedProjects)),
  };
};

// STATES
const mapStateToProps = (state) => {
  const {
    getSelectedProjects,
    getSearchText,
    getIsLoading,
  } = projectsSelectors;

  return {
    loading: getIsLoading(state),
    selectedProjects: getSelectedProjects(state),
    searchText: getSearchText(state),
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
