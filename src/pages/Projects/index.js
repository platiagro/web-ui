import React from 'react';

import './style.scss';

import { Divider, Button, Empty } from 'antd';

import NewProjectModal from '../../components/NewProjectModal';
import ProjectsTable from '../../components/ProjectsTable';

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
          'Experimento 0',
          'Experimento 1',
          'Experimento 2',
          'Experimento 3',
          'Experimento 4',
          'Experimento 5',
          'Experimento 6',
        ],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '2',
        projectName: 'workshp_ForAgri_1',
        experimentsList: ['Experimento 0', 'Experimento 1', 'Experimento 2'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '3',
        projectName: 'workshp_ForAgri_2',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '4',
        projectName: 'workshp_ForAgri_3',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '5',
        projectName: 'workshp_ForAgri_4',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '6',
        projectName: 'workshp_ForAgri_5',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '7',
        projectName: 'workshp_ForAgri_6',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '8',
        projectName: 'workshp_ForAgri_7',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '9',
        projectName: 'workshp_ForAgri_8',
        experimentsList: ['Experimento 0'],
        created: '11/10/2019 12:59:21',
      },
      {
        key: '10',
        projectName: 'workshp_ForAgri_9',
        experimentsList: ['Experimento 0'],
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
      <ProjectsTable projectList={projectList} rowSelection={rowSelection} />
    );
  }

  render() {
    const { modalIsVisible, selectedRowKeys } = this.state;

    const hasSelected = selectedRowKeys.length > 0;

    return (
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
