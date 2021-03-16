import React from 'react';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';

//STYLE
import './style.less';

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    loading: state.uiReducer.projectName.loading,
  };
};

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

export default connect(mapStateToProps)(TasksMenuDetailsContainer);
