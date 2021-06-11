import React from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';

import { Button } from 'uiComponents';

const RunDeploymentButton = ({ disabled, onClick }) => {
  return (
    <Button
      type='primary'
      shape='round'
      isDisabled={disabled}
      handleClick={onClick}
    >
      <CloudUploadOutlined /> Implantar fluxo
    </Button>
  );
};

RunDeploymentButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RunDeploymentButton;
