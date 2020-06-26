// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { fetchPaginatedProjects } from '../../../../store/projects/actions';

// COMPONENTS
import ProjectsTablePagination from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchPaginatedProjects: (page, pageSize) => {
      dispatch(fetchPaginatedProjects(page, pageSize));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.ui.projectsTable.loading,
    currentPage: state.projects.currentPage,
    pageSize: state.projects.pageSize,
    totalTasks: state.projects.totalTasks,
  };
};

/**
 * Projects Table Pagination Container.
 * This component is responsible for create a logic container for projects table pagination
 * with redux.
 */
const ProjectsTablePaginationContainer = (props) => {
  // states
  const { loading, pageSize, totalTasks } = props;
  // dispatchs
  const { handleFetchPaginatedProjects } = props;

  return (
    <>
      {totalTasks > pageSize ? (
        <ProjectsTablePagination
          loading={loading}
          pageSize={pageSize}
          total={totalTasks}
          onChange={handleFetchPaginatedProjects}
        />
      ) : null}
    </>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTablePaginationContainer);
