import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { showNewProjectModal } from 'store/ui/actions';
import { MyProjectsEmptyPlaceholder } from 'components/EmptyPlaceholders';
import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
  PROJECTS_TYPES,
} from 'store/projects';

import ProjectsTable from './index';
import ProjectsTablePagination from '../ProjectsTablePagination/ProjectsTablePaginationContainer';

const { getProjects, getSelectedProjects, getSearchText } = projectsSelectors;

const {
  fetchPaginatedProjectsRequest,
  selectProjects,
  deleteProjectsRequest,
} = projectsActions;

const ProjectsTableContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const projects = useSelector(getProjects);
  const searchText = useSelector(getSearchText);
  const selectedProjects = useSelector(getSelectedProjects);

  useLayoutEffect(() => {
    dispatch(fetchPaginatedProjectsRequest(undefined, 1, 10));
  }, [dispatch]);

  const loading = useIsLoading(
    PROJECTS_TYPES.FETCH_PROJECTS_REQUEST,
    PROJECTS_TYPES.DELETE_PROJECTS_REQUEST
  );

  const handleClickProject = (projectUuid) => {
    history.push(`/projetos/${projectUuid}`);
  };

  const handleFetchPaginatedProjects = (name) => {
    dispatch(fetchPaginatedProjectsRequest(name, 1, 10));
  };

  const handleDeleteProject = (projectUuid) => {
    dispatch(deleteProjectsRequest([projectUuid]));
  };

  const handleShowNewProjectModal = (record) => {
    dispatch(showNewProjectModal(record));
  };

  const handleSelectProjects = (record) => {
    dispatch(selectProjects(record));
  };

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
