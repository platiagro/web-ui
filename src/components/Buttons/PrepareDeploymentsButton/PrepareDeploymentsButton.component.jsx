import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined, ToolOutlined } from '@ant-design/icons';

const PrepareDeploymentsButton = ({ loading, disabled, onClick }) => {
  return (
    <Button
      shape='round'
      type='primary-inverse'
      onClick={onClick}
      disabled={disabled || loading}
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
