// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Image } from 'antd';

// CONTAINER
import ImplantedExperimentsTableContainer from '../ImplantedExperimentsContent/ImplantedExperimentsTable/_/Container';
import NewDeploymentsModalContainer from '../ImplantedExperimentsContent/UsingDeploymentsModal/Container';
import NewExperimentModalContainer from '../ProjectContent/NewExperimentModal/Container';

import Button from '../../../uiComponents/Button/index';

// ACTIONS
import { showUsingDeploymentsModal } from '../../../store/ui/actions';
import { showNewExperimentModal } from '../../../store/ui/actions';

//IMAGES CSV
import experimentacao from '../../../assets/experimentacao.svg';
import fluxo from '../../../assets/fluxo.svg';

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

const sumFluxo = (project) => {
  let countFluxo = 0;
  project.experiments.forEach((elements) => {
    countFluxo += elements.operators.length;
  });
  return countFluxo;
};

const ProjectDetailContainer = (props) => {
  const { project, handleShowModal, handleNewExperimentModal } = props;

  let experimentsLength;
  let fluxoLength;

  if (project.uuid != null) {
    experimentsLength = project.experiments.length;
    fluxoLength = sumFluxo(project);
  }

  const redirectExperimet = () => {
    if (project.uuid != null) {
      history.push(
        '/projetos/' + project.uuid + '/' + project.experiments[0].uuid
      );
    }
  };

  const history = useHistory();

  return (
    <>
      {/** button and description */}
      <div className={'container'}>
        <Row justify='space-between'>
          <Col span={4} className='start'>
            Experimentação <QuestionCircleOutlined />
          </Col>
          <Col span={4}>
            <Button
              disabled={false}
              shape='round'
              icon={<PlusOutlined />}
              type='primary-inverse'
              handleClick={handleNewExperimentModal}
            >
              Novo Experimento
            </Button>
          </Col>
          <Col span={4}>
            <div className={'texto'}>
              Pré-implantação <QuestionCircleOutlined />
            </div>
          </Col>

          <Col className={'flex flex-direction'} span={4}>
            <Button
              disabled={false}
              icon={<PlusOutlined />}
              shape='round'
              type='primary-inverse'
            >
              Escolher fluxo
            </Button>
          </Col>
        </Row>
      </div>

      <div className={'flex'}>
        <Col span={12} onClick={redirectExperimet}>
          <Card className='cards' hoverable>
            <div className={'back-bround-expermentacao'}>
              <div className={'expermentacao-image'}>
                <Image width={50} src={experimentacao} />
              </div>
            </div>
            <div style={{ marginLeft: 170 }}>
              {experimentsLength} experimento(s)
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card className='cards' hoverable>
            <div className={'back-bround-fluxo'}>
              <div className={'fluxo-image'}>
                <Image width={50} src={fluxo} />
              </div>
            </div>

            <div style={{ marginLeft: 170 }}>{fluxoLength} fluxo(s)</div>
          </Card>
        </Col>
      </div>

      <div className={'container '}>
        <Row>
          <Col span={12} className='start'>
            <div className={'texto'}>Fluxos implantados</div>
          </Col>
          <Col span={12} className={'flex flex-direction'} >
           
              <Button
                icon={<QuestionCircleOutlined />}
                disabled={false}
                shape='round'
                type='primary-inverse'
                handleClick={handleShowModal}
              >
                Como usar um fluxo implantado?
              </Button>
            
          </Col>
        </Row>
        {/**Close container */}
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
