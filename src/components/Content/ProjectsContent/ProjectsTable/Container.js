// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// UI COMPONENTS
import { ConfigProvider } from 'antd';

// COMPONENTS
import ProjectsEmpty from '../ProjectsEmpty';
import ProjectsTablePagination from '../ProjectsTablePagination/Container';
import ProjectsTable from './index';

// ACTIONS
import { fetchPaginatedProjects } from '../../../../store/projects/actions';
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
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.projectsTable.loading,
    projects: state.projectsReducer.projects,
  };
};

/**
 * Projects Table Container.
 * This component is responsible for create a logic container for projects table
 * with redux.
 */
const ProjectsTableContainer = ({
  loading,
  projects,
  handleFetchPaginatedProjects,
  handleDeleteProject,
  handleShowNewProjectModal,
}) => {
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
  return (
    <ConfigProvider renderEmpty={ProjectsEmpty}>
      <ProjectsTable
        loading={loading}
        projects={projects}
        handleClickProject={handleClickProject}
        handleClickDelete={handleDeleteProject}
        handleFetchPaginatedProjects={handleFetchPaginatedProjects}
        handleShowNewProjectModal={handleShowNewProjectModal}
      />
      <br />
      <ProjectsTablePagination />
    </ConfigProvider>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTableContainer);
