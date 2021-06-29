import React from 'react';

import './styles.less';

const TasksFlowEmptyPlaceholder = () => {
  return (
    <div className='tasksFlowEmptyPlaceholderContainer'>
      <div className='tasksFlowEmptyPlaceholder'>
        <h3>Você ainda não tem fluxos de tarefas</h3>
        <p>
          Crie fluxos em <strong>Projetos</strong> ou escolha no Marketplace
        </p>
      </div>
    </div>
  );
};

export default TasksFlowEmptyPlaceholder;
