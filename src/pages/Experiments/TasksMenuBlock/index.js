// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import TasksMenuSearch from './TasksMenuSearch';
import TasksMenu from './TasksMenu';

//STYLE
import './style.less';

/**
 * Tasks Menu Block.
 * This component is responsible for displaying tasks menu with search.
 *
 * @component
 * @param {object} props Component props
 * @returns {TasksMenuBlock} React component
 */
const TasksMenuBlock = (props) => {
  // destructuring props
  const {
    menu,
    loading,
    handleTaskClick,
    handleFilter,
    disabled,
    handleDeleteTemplate,
  } = props;

  // RENDER
  return (
    // div container
    <div className='task-menu'>
      <span className='task-menu-title'> Armazém de tarefas</span>
      <TasksMenuSearch disabled={disabled} handleFilter={handleFilter} />
      <TasksMenu
        disabled={disabled}
        handleClick={handleTaskClick}
        handleDeleteTemplate={handleDeleteTemplate}
        menu={menu}
        loading={loading}
      />
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
