// TODO: Corrigir esses erros (acessibilidade)
/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';

import NewExperimentModalContainer from 'components/Content/ExperimentsContent/NewExperimentModal/Container';
import {
  DeploymentsTableContainer,
  InferenceTestResultModalContainer,
  LogsDrawerContainer,
  UsingDeploymentsButtonContainer,
  UsingDeploymentsModalContainer,
  NewDeploymentModalContainer,
} from 'containers';

//COMPONENTS
import Button from 'uiComponents/Button/index';
import { DetailsCardButton } from 'components/Buttons';

import {
  showNewExperimentModal,
  showNewDeploymentModal as showNewDeploymentModalAction,
} from 'store/ui/actions';

import { Selectors, PROJECTS_TYPES } from 'store/projects';

import { useIsLoading } from 'hooks';

import './style.less';

const { getProject } = Selectors;

const ProjectDetailsContainer = () => {
  const { projectId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));
  const projectLoading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  let experimentsLength = 0;
  let fluxoLength = 0;

  if (project.uuid != null) {
    experimentsLength = project.experiments.length;
    fluxoLength = project.deployments.length;
  }

  const showNewDeploymentModal = () => {
    dispatch(showNewDeploymentModalAction());
  };

  const handleNewExperimentModal = () => {
    dispatch(showNewExperimentModal());
  };

  const redirectExperiment = () => {
    if (!projectLoading) {
      history.push('/projetos/' + project.uuid + '/experimentos');
    }
  };

  const redirectDeployments = () => {
    if (!projectLoading) {
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
              disabled={false}
              shape='round'
              icon={<PlusOutlined />}
              type='primary-inverse'
              handleClick={handleNewExperimentModal}
            >
              Novo Experimento
            </Button>
          </div>
          <DetailsCardButton
            projectLoading={projectLoading}
            numberText={experimentsLength}
            onClick={redirectExperiment}
            type='experiment'
          />
        </div>

        <div className='projectDetails'>
          <div className='projectDetailsHeader'>
            <span>
              Pré-implantação <QuestionCircleOutlined />
            </span>
            <Button
              disabled={false}
              icon={<PlusOutlined />}
              shape='round'
              type='primary-inverse'
              handleClick={showNewDeploymentModal}
            >
              Escolher fluxo
            </Button>
          </div>
          <DetailsCardButton
            projectLoading={projectLoading}
            numberText={fluxoLength}
            onClick={redirectDeployments}
            type='deployment'
          />
        </div>
      </div>
      <div className='tableContent'>
        <div className='tableTitle'>
          <span>
            Fluxos implantados <QuestionCircleOutlined />
          </span>
          <UsingDeploymentsButtonContainer />
        </div>
        <DeploymentsTableContainer />
      </div>
      <InferenceTestResultModalContainer />
      <LogsDrawerContainer />
      <NewExperimentModalContainer />
      <UsingDeploymentsModalContainer />
      <NewDeploymentModalContainer />
    </>
  );
};

export default ProjectDetailsContainer;
