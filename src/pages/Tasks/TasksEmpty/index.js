import React from 'react';
import { Empty } from 'antd';
import PropTypes from 'prop-types';

import emptyImage from 'assets/emptyPlaceholder.png';

const TasksEmpty = ({ children }) => (
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

TasksEmpty.propTypes = {
  children: PropTypes.node,
};

TasksEmpty.defaultProps = {
  children: undefined,
};

export default TasksEmpty;
