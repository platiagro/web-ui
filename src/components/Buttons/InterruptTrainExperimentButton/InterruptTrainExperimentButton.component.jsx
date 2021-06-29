import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined, StopOutlined } from '@ant-design/icons';

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

InterruptTrainExperimentButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  deleteExperimentRunning: PropTypes.bool.isRequired,
};

export default InterruptTrainExperimentButton;
