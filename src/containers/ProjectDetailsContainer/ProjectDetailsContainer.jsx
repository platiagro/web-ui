// TODO: Corrigir esses erros (acessibilidade)
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {
  LogsDrawerContainer,
  MonitoringDrawerContainer,
  DeploymentsTableContainer,
  NewDeploymentModalContainer,
  UsingDeploymentsModalContainer,
  UsingDeploymentsButtonContainer,
  InferenceTestResultModalContainer,
} from 'containers';
import {
  showNewExperimentModal,
  showNewDeploymentModal as showNewDeploymentModalAction,
} from 'store/ui/actions';
import { useIsLoading } from 'hooks';
import Button from 'uiComponents/Button';
import { fetchMonitorings } from 'store/monitorings';
import { DetailsCardButton } from 'components/Buttons';
import { Selectors, PROJECTS_TYPES } from 'store/projects';
import NewExperimentModalContainer from 'pages/Experiments/NewExperimentModal/NewExperimentModalContainer';

import './style.less';

const projectSelector = (projectId) => (state) => {
  return Selectors.getProject(projectId, state);
};

const ProjectDetailsContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector(projectId));
  const [clickedDeploymentId, setClickedDeploymentId] = useState('');
  const isLoadingProject = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const experimentsLength = useMemo(() => {
    return project?.experiments?.length || 0;
  }, [project.experiments.length]);

  const fluxoLength = useMemo(() => {
    return project?.deployments?.length || 0;
  }, [project.deployments.length]);

  const handleShowMonitorings = (deploymentId) => {
    dispatch(fetchMonitorings(projectId, deploymentId));
    setClickedDeploymentId(deploymentId);
  };

  const handleHideMonitorings = () => {
    setClickedDeploymentId('');
  };

  const handleShowNewDeploymentModal = () => {
    dispatch(showNewDeploymentModalAction());
  };

  const handleNewExperimentModal = () => {
    dispatch(showNewExperimentModal());
  };

  const handleGoToExperimentsPage = () => {
    if (!isLoadingProject) {
      history.push('/projetos/' + project.uuid + '/experimentos');
    }
  };

  const handleGoToDeploymentPage = () => {
    if (!isLoadingProject) {
      history.push('/projetos/' + project.uuid + '/pre-implantacao');
    }
  };

  return (
    <>
      <div className='container'>
        <div className='projectDetails'>
          <div className='projectDetailsHeader'>
            <span>
              Experimentação <QuestionCircleOutlined />
            </span>

            <Button
              shape='round'
              disabled={false}
              type='primary-inverse'
              icon={<PlusOutlined />}
              handleClick={handleNewExperimentModal}
            >
              Novo Experimento
            </Button>
          </div>

          <DetailsCardButton
            type='experiment'
            numberText={experimentsLength}
            projectLoading={isLoadingProject}
            onClick={handleGoToExperimentsPage}
          />
        </div>

        <div className='projectDetails'>
          <div className='projectDetailsHeader'>
            <span>Pré-implantação</span>
            <QuestionCircleOutlined />

            <Button
              shape='round'
              disabled={false}
              type='primary-inverse'
              icon={<PlusOutlined />}
              handleClick={handleShowNewDeploymentModal}
            >
              Escolher fluxo
            </Button>
          </div>

          <DetailsCardButton
            type='deployment'
            numberText={fluxoLength}
            projectLoading={isLoadingProject}
            onClick={handleGoToDeploymentPage}
          />
        </div>
      </div>

      <div className='tableContent'>
        <div className='tableTitle'>
          <span>Fluxos implantados</span>
          <QuestionCircleOutlined />
          <UsingDeploymentsButtonContainer />
        </div>

        <DeploymentsTableContainer
          handleShowMonitoringDrawer={handleShowMonitorings}
        />
      </div>

      <LogsDrawerContainer />
      <NewExperimentModalContainer />
      <NewDeploymentModalContainer />
      <UsingDeploymentsModalContainer />
      <InferenceTestResultModalContainer />

      <MonitoringDrawerContainer
        projectId={projectId}
        deploymentId={clickedDeploymentId}
        isShowingDrawer={!!clickedDeploymentId}
        handleToggleDrawer={handleHideMonitorings}
      />
    </>
  );
};

export default ProjectDetailsContainer;
