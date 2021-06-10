import React from 'react';
import PropTypes from 'prop-types';
import { BarChartOutlined } from '@ant-design/icons';

import { Button } from 'uiComponents';

const CompareResultsButton = ({ onClick, disabled }) => {
  return (
    <Button
      shape='round'
      type='primary-inverse'
      handleClick={onClick}
      isDisabled={disabled}
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
