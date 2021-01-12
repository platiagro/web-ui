// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { BarChartOutlined } from '@ant-design/icons';
import { Button } from 'uiComponents';

/**
 * A button to compare results
 *
 * @param {*} props Component props
 *
 * @returns {CompareResultsButton} Component
 *
 * @component
 */
const CompareResultsButton = (props) => {
  // destructuring props CompareResultsButton
  const { onClick, disabled } = props;

  // rendering component CompareResultsButton
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

// PROP TYPES
CompareResultsButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
  /** compare results button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default CompareResultsButton;
