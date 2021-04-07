// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
} from 'store/Projects';

// COMPONENTS
import ProjectsTablePagination from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  const { fetchPaginatedProjects } = projectsActions;

  return {
    handleFetchPaginatedProjects: (searchText, page, pageSize) => {
      dispatch(fetchPaginatedProjects(searchText, page, pageSize));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  const {
    getPageSize,
    getCurrentPage,
    getTotalProjects,
    getSearchText,
    getIsLoading,
  } = projectsSelectors;

  return {
    loading: getIsLoading(state),
    searchText: getSearchText(state),
    currentPage: getCurrentPage(state),
    pageSize: getPageSize(state),
    total: getTotalProjects(state),
  };
};

/**
 * Projects Table Pagination Container.
 * This component is responsible for create a logic container for projects table pagination
 * with redux.
 *
 * @param props
 */
const ProjectsTablePaginationContainer = (props) => {
  // states
  const { loading, searchText, currentPage, pageSize, total } = props;

  // dispatchs
  const { handleFetchPaginatedProjects } = props;

  const onChange = (page, size) => {
    handleFetchPaginatedProjects(searchText, page, size);
  };

  return (
    <>
      {total > 0 ? (
        <ProjectsTablePagination
          disabled={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={onChange}
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
