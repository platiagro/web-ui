import React from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import { withRouter } from 'react-router-dom';

//STYLE
import './style.less';
import { Selectors } from 'store/Projects';

// STATES
const mapStateToProps = (state, ownProps) => {
  const { getProject } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
    loading: state.uiReducer.projectName.loading,
  };
};

// FIXME: Componente com nome incoerente
const TasksMenuDetailsContainer = (props) => {
  const { project, loading } = props;
  const formatedDate = new Date(project.updatedAt).toLocaleString();
  const projectDescription =
    project.description || 'Não há descrição disponível';

  return (
    <div className='project-description'>
      <div className='description'>
        <strong> Descrição </strong>
        {loading ? (
          <Skeleton active title={{ width: 200 }} paragraph={false} />
        ) : (
          <p>{projectDescription}</p>
        )}
      </div>
      <div className='updated'>
        <strong> Última modificação </strong>
        {loading ? (
          <Skeleton active title={{ width: 200 }} paragraph={false} />
        ) : (
          <p>{formatedDate}</p>
        )}
      </div>
      <div className='created'>
        <strong> Criado por </strong>
        {loading ? (
          <Skeleton
            active
            avatar={{ shape: 'circle' }}
            title={{ width: 200 }}
            paragraph={false}
          />
        ) : (
          <p className='user-description'>
            <span className='user-avatar'>A</span>
            <span>Usuário anônimo</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default withRouter(connect(mapStateToProps)(TasksMenuDetailsContainer));
