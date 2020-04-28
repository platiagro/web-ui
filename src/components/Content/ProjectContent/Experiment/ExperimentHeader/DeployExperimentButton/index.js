// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * Deploy Experiment Button.
 * This component is responsible for show deploy experiment button.
 */
const DeployExperimentButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='deployExperimentButton'
    type='primary'
    icon='tool'
  >
    Implantar
  </Button>
);

// PROP TYPES
DeployExperimentButton.propTypes = {
  /** deploy experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** deploy experiment button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default DeployExperimentButton;
