/**
 * Component responsible for:
 * - Structuring the projects page layout
 * - Fetch the projects list
 */
import React, { useEffect } from 'react';
import './style.scss';

import { Button, Empty, Spin } from 'antd';

import { connect } from 'react-redux';
import NewProjectModal from '../../components/Project/NewProjectModal';
import ProjectsTable from '../../components/Project/ProjectsTable';
import ContentHeader from '../../components/ContentHeader';

import emptyPlaceholder from '../../assets/emptyPlaceholder.png';

import {
  fetchProjects,
  toggleModal,
} from '../../store/actions/projectsActions';

const Projects = (props) => {
  const { projectsList, loading } = props;

  // Actions
  const { onFetchProjects, onToggleModal } = props;

  useEffect(() => {
    onFetchProjects();
  }, []);

  const renderBody = () => {
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
      <ProjectsTable />
    );
  };

  return (
    <div className='projectPage'>
      <ContentHeader
        title='Projetos'
        subTitle='Crie, experimente e implante fluxos de forma rápida e fácil.'
      />

      <NewProjectModal />

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
        <div className='body'>{renderBody()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
