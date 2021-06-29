import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ContentHeader from 'components/ContentHeader';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import { Actions as projectsActions, Selectors } from 'store/projects';
import PageHeaderDropdown from 'components/ContentHeader/PageHeaderDropdown';

const { updateProjectRequest, fetchProjectRequest } = projectsActions;

const projectSelector = (projectId) => (state) => {
  return Selectors.getProject(projectId, state);
};

const DeploymentsHeaderContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector(projectId));

  const target = useMemo(() => {
    return `/projetos/${projectId}/experimentos`;
  }, [projectId]);

  const handleGoBack = () => {
    history.push(`/projetos/${projectId}`);
  };

  const handleEditProjectName = (newProjectName) => {
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));
  };

  useEffect(() => {
    if (project.uuid === '') {
      dispatch(fetchProjectRequest(projectId, history));
    }
  }, [dispatch, history, project.uuid, projectId]);

  return (
    <ContentHeader
      title={project.name}
      extra={<AccountInfo />}
      handleGoBack={handleGoBack}
      customSubTitle='Meus projetos'
      handleSubmit={handleEditProjectName}
      subTitle={<PageHeaderDropdown type='deployment' target={target} />}
    />
  );
};

export default DeploymentsHeaderContainer;
