// REACT LIBS
import React from 'react';

// STYLES
import './styles.less';

/**
 * Tasks empty placeholder.
 *
 * @returns {TasksEmptyPlaceholder} Component
 * @component
 * @example
 * return <TasksEmptyPlaceholder />;
 */
const TasksEmptyPlaceholder = () => {
  // rendering component
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

// EXPORT DEFAULT
export default TasksEmptyPlaceholder;
