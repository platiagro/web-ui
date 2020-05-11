// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Input, Spin } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

/**
 * String Input.
 * This component is responsible for displaying string input in generic drawer.
 */
const StringInput = ({
  title,
  name,
  description,
  warning,
  tip,
  placeholder,
  value,
  handleChange,
  loading,
}) => (
  // div container
  <div>
    {/* title */}
    <p>{title || name}</p>
    {/* description */}
    <small>{description}</small>
    {/* number input */}
    <Input
      value={value}
      onChange={(e) => handleChange(name, e.target.value)}
      placeholder={placeholder}
      disabled={loading}
      style={{ width: '90%' }}
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
StringInput.propTypes = {
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
StringInput.defaultProps = {
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
export default StringInput;
