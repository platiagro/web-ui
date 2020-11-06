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

const TasksMenuDetailsContainer = (props) =>{
  const { project } = props; 

  //RENDER
  return(
    <>
    <div className="projectDetailsMenu">

     <p className='descriptionTitle'>Descrição</p>
     <p className='valueDescription'> {project.description==null? 'Adiciona descrição': project.description}</p>
     <p className='descriptionTitle'>Última modificação</p>
     <p className='valueDescription'> {project.updatedAt}</p>
     <p className='descriptionTitle'>Criado por</p>
     <p className='valueDescription'>Usuario anônimo</p>   

    </div>
    </>
  )

}



export default connect(
  mapStateToProps,
)(TasksMenuDetailsContainer);