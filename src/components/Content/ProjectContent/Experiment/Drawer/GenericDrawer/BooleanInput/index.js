// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Switch, Spin } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

/**
 * Boolean Input.
 * This component is responsible for displaying boolean (switch) input in generic drawer.
 */
const BooleanInput = ({
  title,
  label,
  name,
  description,
  warning,
  tip,
  placeholder,
  value,
  handleChange,
  loading,
  disabled,
}) => (
  // div container
  <div>
    {/* title */}
    <h3>
      {label || title || name}
      {/* tip */}
      {tip && <InputTip tip={tip} />}
    </h3>
    {/* description */}
    <small>{description}</small>
    <div style={{ marginTop: '10px' }}>
      {/* string input */}
      <Switch
        checkedChildren={<Icon type='check' />}
        unCheckedChildren={<Icon type='close' />}
        defaultChecked={value}
        onChange={(value) => handleChange(name, value)}
        placeholder={placeholder}
        disabled={loading || disabled}
        loading={loading}
      />
    </div>
    {/* loading */}
    {loading && (
      <Spin
        style={{ marginLeft: '1vw' }}
        indicator={<Icon type='loading' spin />}
      />
    )}
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
BooleanInput.propTypes = {
  /** string input title string */
  title: PropTypes.string.isRequired,
  /** string input label string */
  label: PropTypes.string.isRequired,
  /** string input description string */
  description: PropTypes.string.isRequired,
  /** string input warning message string */
  warning: PropTypes.string,
  /** string input tip message string */
  tip: PropTypes.string,
  /** string input min value id string */
  min: PropTypes.number.isRequired,
  /** string input max value id string */
  max: PropTypes.number.isRequired,
  /** string input step value id string */
  step: PropTypes.number,
  /** string input placeholder string */
  placeholder: PropTypes.number,
  /** string input value id string */
  value: PropTypes.number,
  /** string input change handler */
  handleChange: PropTypes.func.isRequired,
  /** string input is disabled */
  disabled: PropTypes.bool.isRequired,
};

// PROP DEFAULT VALUES
BooleanInput.defaultProps = {
  /** string input warning message string */
  warning: undefined,
  /** string input tip message string */
  tip: undefined,
  /** string input value id string */
  value: undefined,
  /** string input step value id string */
  step: undefined,
  /** string input placeholder string */
  placeholder: undefined,
};

// EXPORT
export default BooleanInput;
