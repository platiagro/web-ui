// CORE LIBS
import React from 'react';

// UI LIBS
import { Empty } from 'antd';

// IMAGES
import emptyImage from 'assets/emptyPlaceholder.png';

/**
 * Tasks Empty.
 * This component is responsible for displaying a tasks empty message.
 */
const TasksEmpty = ({ children }) => (
  // empty component
  <Empty
    image={emptyImage}
    imageStyle={{
      height: 136,
    }}
    description={
      <span>
        <span>
          <strong>Nenhuma tarefa foi criada</strong>
        </span>
        <br />
        <span>Clique no botão &quot;Nova Tarefa&quot; para começar</span>
      </span>
    }
  >
    {children}
  </Empty>
);

// EXPORT
export default TasksEmpty;
