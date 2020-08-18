// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Spin } from 'antd';

// COMPONENTS
import TasksMenuSearch from '../TasksMenuSearch';
import TasksMenu from '../TasksMenu';

//STYLE
import './style.less';

/**
 * Tasks Menu Block.
 * This component is responsible for displaying tasks menu with search.
 *
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 * @param root0
 * @param root0.menu
 * @param root0.loading
 * @param root0.handleTaskClick
 * @param root0.handleFilter
 * @param root0.disabled
 * @param root0.handleDeleteTemplate
 */
const TasksMenuBlock = ({
  menu,
  loading,
  handleTaskClick,
  handleFilter,
  disabled,
  handleDeleteTemplate,
}) => {
  // RENDER
  return (
    // div container
    <div className='task-menu'>
      <span className='task-menu-title'>Armazém de tarefas</span>
      <TasksMenuSearch disabled={disabled} handleFilter={handleFilter} />
      {loading ? (
        <Spin style={{ marginTop: '20px' }} />
      ) : (
        <TasksMenu
          disabled={disabled}
          handleClick={handleTaskClick}
          handleDeleteTemplate={handleDeleteTemplate}
          menu={menu}
        />
      )}
    </div>
  );
};

// PROP TYPES
TasksMenuBlock.propTypes = {
  /** tasks menu block tasks list */
  menu: PropTypes.objectOf(PropTypes.any).isRequired,
  /** tasks menu block is disabled */
  disabled: PropTypes.bool.isRequired,
  /** tasks menu task click handler */
  handleTaskClick: PropTypes.func.isRequired,
  /** tasks menu filter handler */
  handleFilter: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default TasksMenuBlock;
