import React from 'react';
import PropTypes from 'prop-types';
import { TableOutlined } from '@ant-design/icons';

import { Button } from 'uiComponents';

const DataViewButton = ({ isDisabled, isLoading, handleClick }) => {
  return (
    <Button
      icon={<TableOutlined />}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleClick={handleClick}
      shape='round'
      type='primary'
    >
      Visualizar dados
    </Button>
  );
};

DataViewButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default DataViewButton;
