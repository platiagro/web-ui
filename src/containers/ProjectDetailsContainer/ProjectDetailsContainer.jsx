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
} from 'containers';
import {
  showNewExperimentModal,
  showNewDeploymentModal,
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

const deploymentsSelector = ({ deploymentsReducer }) => {
  return deploymentsReducer;
};

const ProjectDetailsContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector(projectId));
  const deployments = useSelector(deploymentsSelector);
  const [selectedDeploymentId, setSelectedDeploymentId] = useState('');
  const isLoadingProject = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const experimentsLength = useMemo(() => {
    return project?.experiments?.length || 0;
  }, [project]);

  const fluxoLength = useMemo(() => {
    return deployments?.length || 0;
  }, [deployments]);

  const handleShowMonitorings = (deploymentId) => {
    dispatch(fetchMonitorings(projectId, deploymentId));
    setSelectedDeploymentId(deploymentId);
  };

  const handleHideMonitorings = () => {
    setSelectedDeploymentId('');
  };

  const handleShowNewDeploymentModal = () => {
    dispatch(showNewDeploymentModal());
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
    <div className='project-details'>
      <div className='project-details-cards'>
        <div className='project-details-card'>
          <div className='project-details-card-header'>
            <div>
              <span className='text-with-icon-right'>Experimentação</span>
              <QuestionCircleOutlined />
            </div>

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

        <div className='project-details-card'>
          <div className='project-details-card-header'>
            <div>
              <span className='text-with-icon-right'>Pré-implantação</span>
              <QuestionCircleOutlined />
            </div>

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

      <div className='project-details-table-content'>
        <div className='project-details-table-title'>
          <div>
            <span className='text-with-icon-right'>Fluxos implantados</span>
            <QuestionCircleOutlined />
          </div>

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

      <MonitoringDrawerContainer
        projectId={projectId}
        deploymentId={selectedDeploymentId}
        isShowingDrawer={!!selectedDeploymentId}
        handleHideDrawer={handleHideMonitorings}
      />
    </div>
  );
};

export default ProjectDetailsContainer;
