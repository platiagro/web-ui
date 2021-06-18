import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';
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
  Selectors,
  PROJECTS_TYPES,
  Actions as projectsActions,
} from 'store/projects';

const { updateProjectRequest, fetchProjectRequest } = projectsActions;

const projectSelector = (projectId) => (state) => {
  return Selectors.getProject(projectId, state);
};

const prepareDeploymentsLoadingSelector = ({ uiReducer }) => {
  return uiReducer.prepareDeployments.loading;
};

const ExperimentsHeaderContainer = () => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useIsLoading(
    PROJECTS_TYPES.FETCH_PROJECT_REQUEST,
    PROJECTS_TYPES.UPDATE_PROJECT_REQUEST
  );

  const project = useSelector(projectSelector(projectId));
  const prepareDeploymentsLoading = useSelector(
    prepareDeploymentsLoadingSelector
  );

  const target = useMemo(() => {
    return `/projetos/${projectId}/pre-implantacao`;
  }, [projectId]);

  const handleGoBack = () => {
    history.push(`/projetos/${projectId}`);
  };

  const handleEditProjectName = (newProjectName) => {
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));
  };

  const handlePrepareDeployments = () => {
    dispatch(showPrepareDeploymentsModal());
  };

  const handleCompareResults = () => {
    dispatch(changeVisibilityCompareResultsModal(true));
  };

  useEffect(() => {
    if (project.uuid === '') {
      dispatch(fetchProjectRequest(projectId, history));
    }
  }, [dispatch, history, project.uuid, projectId]);

  return (
    <ContentHeader
      title={project.name}
      subTitle={
        <>
          <PageHeaderDropdown type='experiment' target={target} />
        </>
      }
      customSubTitle='Meus projetos'
      handleGoBack={handleGoBack}
      handleSubmit={handleEditProjectName}
      loading={loading}
      extra={
        <>
          <div className='headerButtons'>
            <CompareResultsButton
              disabled={loading}
              onClick={handleCompareResults}
            />
            <PrepareDeploymentsButton
              disabled={loading}
              loading={prepareDeploymentsLoading}
              onClick={handlePrepareDeployments}
            />
          </div>
          <AccountInfo />
        </>
      }
    />
  );
};

export default ExperimentsHeaderContainer;
