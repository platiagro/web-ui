import React from 'react';

import './styles.less';

const TasksEmptyPlaceholder = () => {
  return (
    <div className='tasksEmptyPlaceholderContainer'>
      <div className='tasksEmptyPlaceholder'>
        <h3>Nenhuma tarefa foi criada</h3>
        <p>
          Clique no botão <strong>Nova Tarefa</strong> para começar
        </p>
      </div>
    </div>
  );
};

export default TasksEmptyPlaceholder;
