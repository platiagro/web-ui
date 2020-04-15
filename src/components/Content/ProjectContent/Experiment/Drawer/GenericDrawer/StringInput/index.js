// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Input } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

/**
 * Number Input.
 * This component is responsible for displaying number input in generic drawer.
 */
const NumberInput = ({
  title,
  name,
  default: defaultValue,
  description,
  warning,
  tip,
  placeholder,
  value,
  handleChange,
}) => (
  // div container
  <div>
    {/* title */}
    <p>{title || name}</p>
    {/* description */}
    <small>{description}</small>
    {/* number input */}
    <Input
      value={value || defaultValue}
      defaultValue={parseFloat(defaultValue)}
      onChange={handleChange}
      placeholder={placeholder}
    />
    {/* tip */}
    {tip && <InputTip tip={tip} />}
    {/* warning */}
    {warning && (
      // warning paragraph container
      <p style={{ marginTop: 10 }}>
        {/* warning icon */}
        <Icon type='exclamation-circle' />
        {/* warning message */}
        <span style={{ marginLeft: 10 }}>{warning}</span>
      </p>
    )}
  </div>
);

// PROP TYPES
NumberInput.propTypes = {
  /** number input title string */
  title: PropTypes.string.isRequired,
  /** number input description string */
  description: PropTypes.string.isRequired,
  /** number input warning message string */
  warning: PropTypes.string,
  /** number input tip message string */
  tip: PropTypes.string,
  /** number input min value id string */
  min: PropTypes.number.isRequired,
  /** number input max value id string */
  max: PropTypes.number.isRequired,
  /** number input step value id string */
  step: PropTypes.number,
  /** number input placeholder string */
  placeholder: PropTypes.number,
  /** number input value id string */
  value: PropTypes.number,
  /** number input change handler */
  handleChange: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
NumberInput.defaultProps = {
  /** number input warning message string */
  warning: undefined,
  /** number input tip message string */
  tip: undefined,
  /** number input value id string */
  value: undefined,
  /** number input step value id string */
  step: undefined,
  /** number input placeholder string */
  placeholder: undefined,
};

// EXPORT
export default NumberInput;
