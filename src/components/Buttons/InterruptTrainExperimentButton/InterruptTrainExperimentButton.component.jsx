// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { LoadingOutlined, StopOutlined } from '@ant-design/icons';
import { Button } from 'antd';

/**
 * Interrupt train Experiment Button.
 * This component is responsible for show interrupt train experiment button.
 */
const InterruptTrainExperimentButton = ({
  handleClick,
  disabled,
  deleteExperimentRunning,
}) => (
  <Button
    disabled={disabled}
    onClick={handleClick}
    shape='round'
    type='primary-inverse'
  >
    {deleteExperimentRunning ? <LoadingOutlined /> : <StopOutlined />}
    Interromper
  </Button>
);

// PROP TYPES
InterruptTrainExperimentButton.propTypes = {
  /** interrupt train experiment button click function */
  handleClick: PropTypes.func.isRequired,
  /** interrupt train experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** delete train experiment is running */
  deleteExperimentRunning: PropTypes.bool.isRequired,
};

// EXPORT
export default InterruptTrainExperimentButton;
