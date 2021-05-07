import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/ContentHeader';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import PageHeaderDropdown from 'components/ContentHeader/PageHeaderDropdown';
import {
  CompareResultsButton,
  PrepareDeploymentsButton,
} from 'components/Buttons';

import {
  changeVisibilityCompareResultsModal,
  showPrepareDeploymentsModal,
} from 'store/ui/actions';

import {
  Actions as projectsActions,
  Selectors,
  PROJECTS_TYPES,
} from 'store/projects';

import { useIsLoading } from 'hooks';

const { getProject } = Selectors;
const { updateProjectRequest, fetchProjectRequest } = projectsActions;

/**
 * Experiments Header Container.
 *
 * This component is responsible for create a logic container for experiments content
 * header with route control.
 */
const ExperimentsHeaderContainer = () => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const target = `/projetos/${projectId}/pre-implantacao`;

  const loading = useIsLoading(
    PROJECTS_TYPES.FETCH_PROJECT_REQUEST,
    PROJECTS_TYPES.UPDATE_PROJECT_REQUEST
  );

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));
  // TODO: Criar seletores
  /* eslint-disable-next-line */
  const prepareDeploymentsLoading = useSelector(
    (state) => state.uiReducer.prepareDeployments.loading
  );

  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectName) =>
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));
  const handlePrepareDeploymentsClick = () =>
    dispatch(showPrepareDeploymentsModal());
  const handleCompareResultsClick = () =>
    dispatch(changeVisibilityCompareResultsModal(true));

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
          <PageHeaderDropdown type='experiment' target={target} />
        </>
      }
      customSubTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      loading={loading}
      extra={
        <>
          <div className='headerButtons'>
            <CompareResultsButton
              disabled={loading}
              onClick={handleCompareResultsClick}
            />
            <PrepareDeploymentsButton
              disabled={loading}
              loading={prepareDeploymentsLoading}
              onClick={handlePrepareDeploymentsClick}
            />
          </div>
          <AccountInfo />
        </>
      }
    />
  );
};

export default ExperimentsHeaderContainer;
