import React from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined, ToolOutlined } from '@ant-design/icons';

import { Button } from 'uiComponents';

const PrepareDeploymentsButton = ({ loading, disabled, onClick }) => {
  return (
    <Button
      shape='round'
      type='primary-inverse'
      handleClick={onClick}
      isDisabled={disabled || loading}
    >
      {loading ? <LoadingOutlined /> : <ToolOutlined />}
      Preparar para a implantação
    </Button>
  );
};

PrepareDeploymentsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PrepareDeploymentsButton;
