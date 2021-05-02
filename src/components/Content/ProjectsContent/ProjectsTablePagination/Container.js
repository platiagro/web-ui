import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
} from 'store/projects';

import ProjectsTablePagination from './index';

const {
  getPageSize,
  getCurrentPage,
  getTotalProjects,
  getSearchText,
  getIsLoading,
} = projectsSelectors;
const { fetchPaginatedProjectsRequest } = projectsActions;

/**
 * Projects Table Pagination Container.
 *
 * This component is responsible for create a logic container for projects table pagination
 * with redux.
 */
const ProjectsTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const loading = useSelector(getIsLoading);
  const searchText = useSelector(getSearchText);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const total = useSelector(getTotalProjects);

  const handleChange = (page, pageSize) => {
    dispatch(fetchPaginatedProjectsRequest(searchText, page, pageSize));
  };

  return (
    <>
      {total > 0 ? (
        <ProjectsTablePagination
          disabled={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handleChange}
        />
      ) : null}
    </>
  );
};

export default ProjectsTablePaginationContainer;
