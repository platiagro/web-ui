import React from 'react';
import _ from 'lodash';
import './style.scss';

import { Divider, Button, Empty, Layout } from 'antd';

import NewProjectModal from '../../components/NewProjectModal';
import ProjectsTable from '../../components/ProjectsTable';
import ExperimentsTabs from '../../components/ExperimentsTabs';
import LeftSideMenu from '../../components/LeftSideMenu';

import meh from '../../assets/meh.svg';

class Projects extends React.Component {
  constructor(props) {
    super(props);

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

    this.state = {
      projectList: projects,
      selectedRowKeys: [],
      modalIsVisible: false,
      projectDetail: {},
    };

    this.renderBody = this.renderBody.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      // eslint-disable-next-line
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ modalIsVisible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  onSelectChange = (selectedRowKeys) => {
    // eslint-disable-next-line
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  enterProjetc = (clickedProject, rowIndex) => {
    // eslint-disable-next-line no-console
    // console.log('clickedProject: ', clickedProject, rowIndex);
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
    const { projectList, selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return projectList.length === 0 ? (
      <Empty
        image={meh}
        imageStyle={{
          height: 60,
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
        rowSelection={rowSelection}
      />
    );
  }

  render() {
    const { modalIsVisible, selectedRowKeys, projectDetail } = this.state;

    const hasSelected = selectedRowKeys.length > 0;

    return !_.isEmpty(projectDetail) ? (
      <Layout.Content>
        <Layout>
          <LeftSideMenu />
          <Layout.Content>
            <ExperimentsTabs details={projectDetail} />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    ) : (
      <div className='project-page'>
        <NewProjectModal
          wrappedComponentRef={this.saveFormRef}
          visible={modalIsVisible}
          onCancel={this.hideModal}
          onCreate={this.handleCreate}
        />

        <div className='header'>
          <Button onClick={this.showModal} type='primary' icon='plus'>
            Novo Projeto
          </Button>

          <Divider type='vertical' />

          <Button disabled={!hasSelected}>Excluir</Button>
        </div>

        <Divider />

        <div className='body'>{this.renderBody()}</div>
      </div>
    );
  }
}

export default Projects;
