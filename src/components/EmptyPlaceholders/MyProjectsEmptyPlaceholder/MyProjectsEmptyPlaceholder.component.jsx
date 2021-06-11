import React from 'react';

import './styles.less';

const MyProjectsEmptyPlaceholder = () => {
  return (
    <div className='myProjectsEmptyPlaceholderContainer'>
      <div className='myProjectsEmptyPlaceholder'>
        <h3>Você ainda não tem projetos</h3>
        <p>
          Clique no botão <strong>Novo Projeto</strong> para começar
        </p>
      </div>
    </div>
  );
};

export default MyProjectsEmptyPlaceholder;
