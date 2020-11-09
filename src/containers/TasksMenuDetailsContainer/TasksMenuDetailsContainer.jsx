import React from 'react';
import { connect } from 'react-redux';

//STYLE
import './style.less';

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
  };
};

const TasksMenuDetailsContainer = (props) => {
  const { project } = props;
  const formatedDate = new Date(project.updatedAt).toLocaleString();
  return (
    <div className='project-description'>
      <strong> Descrição </strong>
      <p>
        {project.description == null
          ? 'Não há descrição disponível'
          : project.description}
      </p>
      <strong> Última modificação </strong>
      <p>{formatedDate}</p>
      <strong> Criado por </strong>
      <p className='user-description'>
        <span className='user-avatar'>A</span>
        <span>Usuário anônimo</span>
      </p>
    </div>
  );
};

export default connect(mapStateToProps)(TasksMenuDetailsContainer);
