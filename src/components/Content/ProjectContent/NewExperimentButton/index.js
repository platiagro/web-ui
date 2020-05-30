// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * New Experiment Button.
 * This component is responsible for show new project button.
 */
const NewExperimentButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    size='small'
    type='add'
    icon='plus'
  />
);

// PROP TYPES
NewExperimentButton.propTypes = {
  /** new experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new experiment button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewExperimentButton;
