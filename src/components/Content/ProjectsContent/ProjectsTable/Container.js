// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import ProjectsTablePagination from '../ProjectsTablePagination/Container';
import ProjectsTable from './index';
import { MyProjectsEmptyPlaceholder } from 'components/EmptyPlaceholders';

// ACTIONS
import {
  fetchPaginatedProjects,
  selectProjects,
} from '../../../../store/projects/actions';
import { deleteProjectRequest } from '../../../../store/project/actions';

// ACTIONS
import { showNewProjectModal } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchPaginatedProjects: (name) =>
      dispatch(fetchPaginatedProjects(name, 1, 10)),
    handleDeleteProject: (projectUuid) =>
      dispatch(deleteProjectRequest(projectUuid)),
    handleShowNewProjectModal: (record) =>
      dispatch(showNewProjectModal(record)),
    handleSelectProjects: (record) => dispatch(selectProjects(record)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.projectsTable.loading,
    projects: state.projectsReducer.projects,
    searchText: state.projectsReducer.searchText,
    selectedProjects: state.projectsReducer.selectedProjects,
  };
};

/**
 * Projects Table Container.
 * This component is responsible for create a logic container for projects table
 * with redux.
 *
 * @param props
 */
const ProjectsTableContainer = (props) => {
  // destructuring props
  const {
    loading,
    projects,
    searchText,
    selectedProjects,
    handleFetchPaginatedProjects,
    handleDeleteProject,
    handleShowNewProjectModal,
    handleSelectProjects,
  } = props;

  // CONSTANTS
  // getting history
  const history = useHistory();

  // HOOKS
  // did mount hook
  useLayoutEffect(() => {
    handleFetchPaginatedProjects();
  }, [handleFetchPaginatedProjects]);

  // HANDLERS
  // project click
  const handleClickProject = (projectUuid) =>
    history.push(`/projetos/${projectUuid}`);

  // RENDER
  return loading || searchText || (projects && projects.length > 0) ? (
    <div className='myProjectsTableContainer'>
      <ProjectsTable
        loading={loading}
        projects={projects}
        selectedProjects={selectedProjects}
        handleClickProject={handleClickProject}
        handleClickDelete={handleDeleteProject}
        handleFetchPaginatedProjects={handleFetchPaginatedProjects}
        handleShowNewProjectModal={handleShowNewProjectModal}
        handleSelectProjects={handleSelectProjects}
      />
      <br />
      <ProjectsTablePagination />
    </div>
  ) : (
    <MyProjectsEmptyPlaceholder />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTableContainer);
