import React from 'react';
import './style.less';

const ProjectDescription = ({ detail }) => {
  console.log(detail);
  const { description, updatedAt } = detail;
  const formatedDate = new Date(updatedAt).toLocaleString();
  console.log(formatedDate);
  return (
    <div className='project-description'>
      <strong> Descrição </strong>
      <p>{description}</p>
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

export default ProjectDescription;
