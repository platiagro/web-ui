// CORE LIBS
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';

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
    const trimmedValue = value?.trim();
    const trimmedCurrentValue = currentValue?.trim();

    // new value is different from old
    if (trimmedValue !== trimmedCurrentValue)
      handleChange(name, trimmedCurrentValue);
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
        {/* string input */}
        <Input
          ref={inputRef}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={beforeSubmit}
          onKeyUp={handleKeyPress}
          placeholder={placeholder}
          disabled={loading || disabled}
          style={{ width: '90%' }}
        />
      </div>
      {/* loading */}
      {loading && (
        <Spin style={{ marginLeft: '1vw' }} indicator={<LoadingOutlined />} />
      )}
      {/* warning */}
      {warning && (
        // warning paragraph container
        <p style={{ marginTop: 10 }}>
          {/* warning icon */}
          <ExclamationCircleOutlined />
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
  title: PropTypes.string,
  /** string input label string */
  label: PropTypes.string,
  /** string input description string */
  description: PropTypes.string,
  /** string input warning message string */
  warning: PropTypes.string,
  /** string input tip message string */
  tip: PropTypes.string,
  /** string input placeholder string */
  placeholder: PropTypes.number,
  /** string input value id string */
  value: PropTypes.string,
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
  /** string input title string */
  title: undefined,
  /** string input label string */
  label: undefined,
  /** string input description string */
  description: undefined,
};

// EXPORT
export default StringInput;
