import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PlayCircleFilled } from '@ant-design/icons';

const TrainExperimentButton = ({ handleClick, disabled }) => (
  <Button
    disabled={disabled}
    onClick={handleClick}
    shape='round'
    type='primary'
  >
    <PlayCircleFilled />
    Executar
  </Button>
);

TrainExperimentButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TrainExperimentButton;
