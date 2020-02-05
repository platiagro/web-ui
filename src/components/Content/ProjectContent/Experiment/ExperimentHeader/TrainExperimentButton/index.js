// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * Train Experiment Button.
 * This component is responsible for show train experiment button.
 */
const TrainExperimentButton = ({
  handleClick,
  disabled,
  experimentRunning,
}) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='trainExperimentButton'
    type='primary'
    icon={experimentRunning ? 'loading' : 'play-circle'}
  >
    Executar
  </Button>
);

// PROP TYPES
TrainExperimentButton.propTypes = {
  /** train experiment button click function */
  handleClick: PropTypes.func.isRequired,
  /** train experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** train experiment is running */
  experimentRunning: PropTypes.bool.isRequired,
};

// EXPORT
export default TrainExperimentButton;
