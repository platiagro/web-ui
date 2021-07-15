import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PartitionOutlined } from '@ant-design/icons';

const SaveTemplateButton = ({ disabled, onClick }) => {
  return (
    <Button
      type='primary-inverse'
      shape='round'
      onClick={onClick}
      disabled={disabled}
    >
      <PartitionOutlined />
      Salvar como template
    </Button>
  );
};

SaveTemplateButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SaveTemplateButton;
