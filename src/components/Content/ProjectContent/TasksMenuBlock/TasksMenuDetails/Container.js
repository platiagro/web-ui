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
    <div className="projetDetailsMenu">

     <p className='description'>Descrição</p>
     <p className='valueDescription'> {project.description==null? 'Adiciona descrição': project.description}</p>
     <p className='modificationDate'>Última modificação</p>
     <p className='modificationValue'> {project.updatedAt}</p>
     <p className='creator'>Criado por</p>   

    </div>
    </>
  )

}



export default connect(
  mapStateToProps,
)(TasksMenuDetails);