// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { PlayCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';

/**
 * Train Experiment Button.
 * This component is responsible for show train experiment button.
 */
const TrainExperimentButton = ({ handleClick, disabled }) => (
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='ant-btn-oval'
    type='primary'
  >
    <PlayCircleFilled />
    Executar
  </Button>
);

// PROP TYPES
TrainExperimentButton.propTypes = {
  /** train experiment button click function */
  handleClick: PropTypes.func.isRequired,
  /** train experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default TrainExperimentButton;
