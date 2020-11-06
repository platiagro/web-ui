/* eslint-disable jsx-a11y/no-static-element-interactions */
// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';

// CONTAINER
import ImplantedExperimentsTableContainer from 'components/Content/ImplantedExperimentsContent/ImplantedExperimentsTable/_/Container';
import NewDeploymentsModalContainer from 'components/Content/ImplantedExperimentsContent/UsingDeploymentsModal/Container';
import NewExperimentModalContainer from 'components/Content/ProjectContent/NewExperimentModal/Container';

import Button from 'uiComponents/Button/index';

// ACTIONS
import { showUsingDeploymentsModal } from 'store/ui/actions';
import { showNewExperimentModal } from 'store/ui/actions';

//IMAGES SVG
import experimentacao from 'assets/experimentacao.svg';
import fluxo from 'assets/fluxo.svg';

import './style.less';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: () => dispatch(showUsingDeploymentsModal()),
    // show new project modal
    handleNewExperimentModal: () => dispatch(showNewExperimentModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.tasksMenu.loading,
    tasks: state.tasksReducer.tasks,
    project: state.projectReducer,
    tasksMenu: state.tasksMenuReducer.filtered,
    trainingLoading: state.uiReducer.experimentTraining.loading,
    allTasks: state.tasksMenuReducer,
  };
};

const ProjectDetailContainer = (props) => {
  const { project, handleShowModal, handleNewExperimentModal } = props;

  let experimentsLength = 0;
  let fluxoLength = 0;

  if (project.uuid != null) {
    experimentsLength = project.experiments.length;
    project.experiments.forEach((elements) => {
      fluxoLength += elements.operators.length;
    });
  }

  const redirectExperiment = () => {
    if (project.uuid != null && project.experiments[0].uuid != null) {
      history.push(
        '/projetos/' + project.uuid + '/' + project.experiments[0].uuid
      );
    }
  };

  const history = useHistory();

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
          <div className='cards' onClick={redirectExperiment}>
            <div className='experimentacaoImage'>
              <Image width={50} src={experimentacao} />
            </div>

            <div className='cardsText'>
              <span>{experimentsLength}</span> experimento(s)
            </div>
          </div>
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
            >
              Escolher fluxo
            </Button>
          </div>
          <div className='cards'>
            <div className='fluxoImage'>
              <Image width={50} src={fluxo} />
            </div>

            <div className='cardsText'>
              <span>{fluxoLength}</span>fluxo(s)
            </div>
          </div>
        </div>
      </div>

      <div className='tableTitle'>
        <span>
          Fluxos implantados <QuestionCircleOutlined />
        </span>

        <Button
          icon={<QuestionCircleOutlined />}
          disabled={false}
          shape='round'
          type='primary-inverse'
          handleClick={handleShowModal}
        >
          Como usar um fluxo implantado?
        </Button>
      </div>

      <ImplantedExperimentsTableContainer />
      <NewDeploymentsModalContainer />
      <NewExperimentModalContainer />
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailContainer);
