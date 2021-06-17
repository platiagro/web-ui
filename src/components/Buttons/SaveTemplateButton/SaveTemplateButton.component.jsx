import React from 'react';
import PropTypes from 'prop-types';
import { PartitionOutlined } from '@ant-design/icons';

import { Button } from 'uiComponents';

const SaveTemplateButton = ({ disabled, onClick }) => {
  return (
    <Button
      type='primary-inverse'
      shape='round'
      handleClick={onClick}
      isDisabled={disabled}
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
