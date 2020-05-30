// CORE LIBS
import React, { useState } from 'react';
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
}) => {
  const [inputValue, setInputValue] = useState(value);

  return (
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
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => setInputValue(value)}
          onPressEnter={(e) => handleChange(name, e.target.value)}
          placeholder={placeholder}
          disabled={loading || disabled}
          style={{ width: '90%' }}
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
};

// PROP TYPES
StringInput.propTypes = {
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

// PROP DEFAULT VALUESstring
StringInput.defaultProps = {
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
export default StringInput;
