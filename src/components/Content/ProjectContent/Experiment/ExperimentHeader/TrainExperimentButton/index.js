// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Icon } from 'antd';

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
    className='ant-btn-oval'
    type='primary'
  >
    {experimentRunning ? <Icon type='loading' /> : <Icon type='play-circle' theme='filled' />}
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
