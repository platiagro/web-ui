import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
  PROJECTS_TYPES,
} from 'store/projects';
import { useIsLoading } from 'hooks';

import ProjectsTablePagination from './index';

const { getPageSize, getCurrentPage, getTotalProjects, getSearchText } =
  projectsSelectors;

const { fetchPaginatedProjectsRequest } = projectsActions;

const ProjectsTablePaginationContainer = () => {
  const dispatch = useDispatch();

  const loading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECTS_REQUEST);
  const searchText = useSelector(getSearchText);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const total = useSelector(getTotalProjects);

  const handleChange = (page, newPageSize) => {
    dispatch(fetchPaginatedProjectsRequest(searchText, page, newPageSize));
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
