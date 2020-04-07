// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * New Template Button.
 * This component is responsible for show new template button.
 */
const NewTemplateButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='newTemplateButton'
    type='primary'
    icon='save'
  >
    Salvar Template
  </Button>
);

// PROP TYPES
NewTemplateButton.propTypes = {
  /** new template button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new template button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewTemplateButton;
