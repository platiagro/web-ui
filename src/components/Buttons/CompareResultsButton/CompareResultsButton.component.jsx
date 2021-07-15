import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { BarChartOutlined } from '@ant-design/icons';

const CompareResultsButton = ({ onClick, disabled }) => {
  return (
    <Button
      shape='round'
      type='primary-inverse'
      onClick={onClick}
      disabled={disabled}
    >
      <BarChartOutlined />
      Comparar resultados
    </Button>
  );
};

CompareResultsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CompareResultsButton;
