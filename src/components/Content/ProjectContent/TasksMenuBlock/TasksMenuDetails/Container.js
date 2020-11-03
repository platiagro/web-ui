import React from 'react';
import { connect } from 'react-redux';

//STYLE
import './style.less';


// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer
  };
};

const TasksMenuDetails = (props) =>{
  const { project } = props; 

  //RENDER
  return(
    <>
    
     <p className={'description'}>Descrição</p>
     <p className={'valueDescription'}> {project.description==null? 'Adiciona descrio': project.description}</p>
     <p className={'modification_date'}>Última modificação</p>
     <p className={'modification_value'}> {project.updatedAt}</p>
     <p className={'create_Ate'}>Criado por</p>   
    </>
  )

}



export default connect(
  mapStateToProps,
)(TasksMenuDetails);