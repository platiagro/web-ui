// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * New Task Button.
 * This component is responsible for displaying new task button.
 */
const NewTaskButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='newTaskButton'
    type='primary'
    icon='plus'
  >
    Nova Tarefa
  </Button>
);

// PROP TYPES
NewTaskButton.propTypes = {
  /** new task button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new task button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewTaskButton;
