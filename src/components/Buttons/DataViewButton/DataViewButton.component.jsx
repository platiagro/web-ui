import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { TableOutlined } from '@ant-design/icons';

const DataViewButton = ({ disabled, loading, onClick }) => {
  return (
    <Button
      icon={<TableOutlined />}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      shape='round'
      type='primary'
    >
      Visualizar dados
    </Button>
  );
};

DataViewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default DataViewButton;
