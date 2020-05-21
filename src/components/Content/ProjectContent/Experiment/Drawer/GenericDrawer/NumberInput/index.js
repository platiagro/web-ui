// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, InputNumber, Spin } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

/**
 * Number Input.
 * This component is responsible for displaying number input in generic drawer.
 */
const NumberInput = ({
  title,
  label,
  name,
  description,
  warning,
  tip,
  min,
  max,
  step,
  placeholder,
  value,
  loading,
  disabled,
  handleChange,
}) => (
  // div container
  <div>
    {/* title */}
    <p>{label || title || name}</p>
    {/* description */}
    <small>{description}</small>
    {/* number input */}
    <InputNumber
      value={value}
      onChange={(inputValue) => handleChange(name, inputValue)}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      decimalSeparator=','
      disabled={loading || disabled}
    />
    {/* loading */}
    {loading && (
      <Spin
        style={{ marginLeft: '1vw' }}
        indicator={<Icon type='loading' spin />}
      />
    )}
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
  /** number input label string */
  label: PropTypes.string.isRequired,
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
  /** number input is disabled */
  disabled: PropTypes.bool.isRequired,
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
