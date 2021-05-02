import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProjectsTablePagination from '../ProjectsTablePagination/Container';
import ProjectsTable from './index';
import { MyProjectsEmptyPlaceholder } from 'components/EmptyPlaceholders';

import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
} from 'store/projects';

import { showNewProjectModal } from '../../../../store/ui/actions';

const {
  getProjects,
  getSelectedProjects,
  getSearchText,
  getIsLoading,
} = projectsSelectors;

const {
  fetchPaginatedProjectsRequest,
  selectProjects,
  deleteProjectsRequest,
} = projectsActions;

/**
 * Projects Table Container.
 *
 * This component is responsible for create a logic container for projects table
 * with redux.
 */
const ProjectsTableContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector(getIsLoading);
  const projects = useSelector(getProjects);
  const searchText = useSelector(getSearchText);
  const selectedProjects = useSelector(getSelectedProjects);

  useLayoutEffect(() => {
    dispatch(fetchPaginatedProjectsRequest(undefined, 1, 10));

    // did mount
    /* eslint-disable-next-line */
  }, []);

  const handleClickProject = (projectUuid) =>
    history.push(`/projetos/${projectUuid}`);

  const handleFetchPaginatedProjects = (name) =>
    dispatch(fetchPaginatedProjectsRequest(name, 1, 10));

  const handleDeleteProject = (projectUuid) =>
    dispatch(deleteProjectsRequest([projectUuid]));

  const handleShowNewProjectModal = (record) =>
    dispatch(showNewProjectModal(record));

  const handleSelectProjects = (record) => dispatch(selectProjects(record));

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

export default ProjectsTableContainer;
