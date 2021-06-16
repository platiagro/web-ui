import React, { memo } from 'react';
import PropTypes from 'prop-types';

import TasksMenuSearch from './TasksMenuSearch';
import TasksMenu from './TasksMenu';

import './style.less';

const TasksMenuBlock = (props) => {
  const {
    menu,
    loading,
    disabled,
    handleFilter,
    handleTaskClick,
    handleDeleteTemplate,
  } = props;

  return (
    <div className='task-menu'>
      <span className='task-menu-title'>Armazém de tarefas</span>
      <TasksMenuSearch handleFilter={handleFilter} />

      <TasksMenu
        menu={menu}
        loading={loading}
        disabled={disabled}
        handleClick={handleTaskClick}
        handleDeleteTemplate={handleDeleteTemplate}
      />
    </div>
  );
};

TasksMenuBlock.propTypes = {
  menu: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleTaskClick: PropTypes.func.isRequired,
  handleDeleteTemplate: PropTypes.func.isRequired,
};

export default memo(TasksMenuBlock);
