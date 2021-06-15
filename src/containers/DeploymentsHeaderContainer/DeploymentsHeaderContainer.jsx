import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ContentHeader from 'components/ContentHeader';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import { Actions as projectsActions, Selectors } from 'store/projects';
import PageHeaderDropdown from 'components/ContentHeader/PageHeaderDropdown';

const { getProject } = Selectors;
const { updateProjectRequest, fetchProjectRequest } = projectsActions;

const DeploymentsHeaderContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const target = `/projetos/${projectId}/experimentos`;

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));

  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectName) =>
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));

  useEffect(() => {
    if (project.uuid === '') {
      dispatch(fetchProjectRequest(projectId, history));
    }

    // component did mount
    /* eslint-disable-next-line */
  }, []);

  return (
    <ContentHeader
      title={project.name}
      subTitle={
        <>
          <PageHeaderDropdown type='deployment' target={target} />
        </>
      }
      customSubTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      extra={
        <>
          {/* FIXME: missing deployment buttons */}
          <AccountInfo />
        </>
      }
    />
  );
};

export default DeploymentsHeaderContainer;
