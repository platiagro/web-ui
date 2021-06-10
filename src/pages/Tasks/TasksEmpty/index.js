import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

import EmptyPlaceholderImage from 'assets/emptyPlaceholder.png';

const TasksEmpty = ({ children }) => (
  <Empty
    image={EmptyPlaceholderImage}
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
