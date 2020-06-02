// CORE LIBS
import React, { useRef, useState, useEffect } from 'react';
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
}) => {
  // HOOKS
  const inputRef = useRef();
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // FUNCTIONS
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      await setCurrentValue(value);
      inputRef.current.blur();
    }
  };

  const beforeSubmit = () => {
    // new value is different from old
    if (value !== currentValue) handleChange(name, currentValue);
  };

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
        {/* number input */}
        <InputNumber
          ref={inputRef}
          value={currentValue}
          onChange={(valueReceived) => {
            setCurrentValue(valueReceived);
          }}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          decimalSeparator=','
          disabled={loading || disabled}
          onKeyUp={handleKeyPress}
          onBlur={beforeSubmit}
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
NumberInput.propTypes = {
  /** number input title string */
  title: PropTypes.string.isRequired,
  /** number input label string */
  label: PropTypes.string.isRequired,
  /** number input name string */
  name: PropTypes.string.isRequired,
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
