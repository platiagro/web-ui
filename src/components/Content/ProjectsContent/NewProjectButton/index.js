// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * New Project Button.
 * This component is responsible for show new project button.
 */
const NewProjectButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='newProjectButton'
    type='primary'
    icon='plus'
  >
    Novo Projeto
  </Button>
);

// PROP TYPES
NewProjectButton.propTypes = {
  /** new project button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new project button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewProjectButton;
