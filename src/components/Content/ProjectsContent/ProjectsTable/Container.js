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
    handleFetchProjects: () => dispatch(fetchPaginatedProjects(1, 10)),
    handleDeleteProject: (projectUuid) =>
      dispatch(deleteProjectRequest(projectUuid)),
    handleShowNewProjectModal: (record) =>
      dispatch(showNewProjectModal(record)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    loading: state.ui.projectsTable.loading,
  };
};

/**
 * Projects Table Container.
 * This component is responsible for create a logic container for projects table
 * with redux.
 */
const ProjectsTableContainer = ({
  projects,
  loading,
  handleFetchProjects,
  handleDeleteProject,
  handleShowNewProjectModal,
}) => {
  // CONSTANTS
  // getting history
  const history = useHistory();

  // HOOKS
  // did mount hook
  useLayoutEffect(() => {
    // fetching projects
    handleFetchProjects();
  }, [handleFetchProjects]);

  // HANDLERS
  // project click
  const handleClickProject = (projectUuid) =>
    history.push(`/projetos/${projectUuid}`);

  // RENDER
  return (
    <ConfigProvider renderEmpty={ProjectsEmpty}>
      <ProjectsTable
        projects={projects}
        handleClickProject={handleClickProject}
        handleClickDelete={handleDeleteProject}
        loading={loading}
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
