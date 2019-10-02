import React from 'react';
import _ from 'lodash';
import './style.scss';

import { Button, Empty, Spin } from 'antd';

import NewProjectModal from '../../components/NewProjectModal';
import ProjectsTable from '../../components/ProjectsTable';
import ExperimentContainer from '../../components/ExperimentContainer';
import ContentHeader from '../../components/ContentHeader';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

import api from '../../services/api';

// remove after tests
const projects = [
  {
    key: '1',
    projectName: 'workshp_ForAgri_0',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '2',
    projectName: 'workshp_ForAgri_1',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '3',
    projectName: 'workshp_ForAgri_2',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
      {
        title: 'Experimento 3',
        content: 'Content of Tab Pane 1',
        key: 'exp3',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '4',
    projectName: 'workshp_ForAgri_3',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
      {
        title: 'Experimento 3',
        content: 'Content of Tab Pane 1',
        key: 'exp3',
      },
      {
        title: 'Experimento 4',
        content: 'Content of Tab Pane 1',
        key: 'exp4',
      },
      {
        title: 'Experimento 5',
        content: 'Content of Tab Pane 1',
        key: 'exp5',
      },
      {
        title: 'Experimento 6',
        content: 'Content of Tab Pane 1',
        key: 'exp6',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '5',
    projectName: 'workshp_ForAgri_4',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
      {
        title: 'Experimento 3',
        content: 'Content of Tab Pane 1',
        key: 'exp3',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '6',
    projectName: 'workshp_ForAgri_5',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '7',
    projectName: 'workshp_ForAgri_6',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '8',
    projectName: 'workshp_ForAgri_7',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '9',
    projectName: 'workshp_ForAgri_8',
    experimentsList: [
      {
        title: 'Experimento 1',
        content: 'Content of Tab Pane 1',
        key: 'exp1',
      },
      {
        title: 'Experimento 2',
        content: 'Content of Tab Pane 1',
        key: 'exp2',
      },
    ],
    created: '11/10/2019 12:59:21',
  },
  {
    key: '10',
    projectName: 'workshp_ForAgri_9',
    experimentsList: [],
    created: '11/10/2019 12:59:21',
  },
];

projects.forEach((project) => {
  const projectAux = project;
  projectAux.experiments = project.experimentsList.join(', ');
});

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      projectList: [],
      modalIsVisible: false,
      projectDetail: {},
    };

    this.renderBody = this.renderBody.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await api.get(`/projects`);

    this.setState({ loading: false });

    this.setState({ projectList: response.data.payload });
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const response = await api.post('/projects', JSON.stringify(values), {
        headers: {
          'content-type': 'application/json',
        },
      });

      form.resetFields();
      this.setState({ modalIsVisible: false });

      this.enterProjetc(response.data.payload);
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  enterProjetc = (clickedProject) => {
    this.setState({ projectDetail: clickedProject });
  };

  showModal() {
    this.setState({ modalIsVisible: true });
  }

  hideModal() {
    const { form } = this.formRef.props;

    this.setState({ modalIsVisible: false });

    form.resetFields();
  }

  renderBody() {
    const { loading, projectList } = this.state;

    if (loading) return <Spin />;

    return projectList.length === 0 ? (
      <Empty
        image={emptyPlaceholder}
        imageStyle={{
          height: 136,
        }}
        description={
          <span>
            <span>
              <strong>Nenhum projeto foi criado</strong>
            </span>
            <br />
            <span>Clique no botão &quot;Novo Projeto&quot; para começar</span>
          </span>
        }
      />
    ) : (
      <ProjectsTable
        enterProjetc={this.enterProjetc}
        projectList={projectList}
      />
    );
  }

  render() {
    const { loading, modalIsVisible, projectDetail } = this.state;

    return !_.isEmpty(projectDetail) ? (
      <ExperimentContainer details={projectDetail} />
    ) : (
      <div className='projectPage'>
        <NewProjectModal
          wrappedComponentRef={this.saveFormRef}
          visible={modalIsVisible}
          onCancel={this.hideModal}
          onCreate={this.handleCreate}
        />

        <ContentHeader
          title='Projetos'
          subTitle='Crie, experimente e implante fluxos de forma rápida e fácil.'
        />

        <div className='projectPageBody'>
          <div className='header'>
            <Button
              disabled={loading}
              onClick={this.showModal}
              type='primary'
              icon='plus'
            >
              Novo Projeto
            </Button>
          </div>
          <div className='body'>{this.renderBody()}</div>
        </div>
      </div>
    );
  }
}

export default Projects;
