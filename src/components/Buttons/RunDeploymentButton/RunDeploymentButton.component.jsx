import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';

const RunDeploymentButton = ({ disabled, onClick }) => {
  return (
    <Button type='primary' shape='round' disabled={disabled} onClick={onClick}>
      <CloudUploadOutlined /> Implantar fluxo
    </Button>
  );
};

RunDeploymentButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RunDeploymentButton;
