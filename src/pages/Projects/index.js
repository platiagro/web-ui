import React from 'react';
import './style.scss';

import { Button, Empty, Spin } from 'antd';

import projects from './projects_mock';
import NewProjectModal from '../../components/NewProjectModal';
import ProjectsTable from '../../components/ProjectsTable';
import ContentHeader from '../../components/ContentHeader';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

import * as projectsServices from '../../services/projectsApi';

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
    };

    this.renderBody = this.renderBody.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.projectsFetch();
  }

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { history } = this.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const response = await projectsServices.createProject(values.name);
      if (response) {
        form.resetFields();
        this.setState({ modalIsVisible: false }, () => {
          history.push(`/projects/${response.data.payload.uuid}`);
        });
      }
      // this.projectsFetch(); Não precisa do fetch, já vai para a prox pagina
    });
  };

  projectsFetch = async () => {
    this.setState({ loading: true });

    const response = await projectsServices.getAllProjects();

    this.setState({ loading: false });

    if (response) this.setState({ projectList: response.data.payload });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  // enterProjetc = (clickedProject) => {
  //   console.log(clickedProject);
  //   window.location = `projects/${clickedProject.key - 1}`;
  //   // this.setState({ projectDetail: clickedProject });
  // };

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
    const { loading, modalIsVisible } = this.state;

    return (
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
