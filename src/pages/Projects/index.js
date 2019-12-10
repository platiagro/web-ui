import React from 'react';
import './style.scss';

import { Button, Empty, Spin } from 'antd';

import { connect } from 'react-redux';
import NewProjectModal from '../../components/NewProjectModal';
import ProjectsTable from '../../components/ProjectsTable';
import ContentHeader from '../../components/ContentHeader';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

import {
  addProject,
  fetchProjects,
  toggleModal,
} from '../../store/actions/projectsActions';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    const { onFetchProjects } = this.props;
    onFetchProjects();
  }

  handleCreate = (name) => {
    const { onAddProject, history } = this.props;
    onAddProject(name, history);
  };

  renderBody() {
    const { projectsList, loading } = this.props;

    if (loading) return <Spin />;

    return projectsList.length === 0 ? (
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
        projectList={projectsList}
      />
    );
  }

  render() {
    const { onToggleModal, loading, modalIsVisible } = this.props;

    return (
      <div className='projectPage'>
        <NewProjectModal
          visible={modalIsVisible}
          onCancel={onToggleModal}
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
              onClick={onToggleModal}
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

const mapStateToProps = (state) => {
  return {
    ...state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProject: (name, history) => {
      dispatch(addProject(name, history));
    },
    onFetchProjects: () => {
      dispatch(fetchProjects());
    },
    onToggleModal: () => {
      dispatch(toggleModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
