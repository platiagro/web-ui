// CORE LIBS
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { InputNumber, Spin } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

/**
 * A input block with number input
 *
 * @param {object} props Component props
 * @returns {NumberInputBlock} Component
 * @component
 */
const NumberInputBlock = (props) => {
  // destructuring props
  const {
    title,
    name,
    tip,
    min,
    max,
    step,
    placeholder,
    value,
    isLoading,
    isDisabled,
    handleChange,
  } = props;

  // HOOKS
  // use ref
  const inputRef = useRef();
  // use state
  const [currentValue, setCurrentValue] = useState(value);
  // use effect
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // FUNCTIONS
  // handle key press
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      await setCurrentValue(value);
      inputRef.current.blur();
    }
  };
  // before submit
  const beforeSubmit = () => {
    // new value is different from old
    if (value !== currentValue) handleChange(name, currentValue);
  };

  return (
    <InputBlockContainer tip={tip} title={title}>
      {isLoading ? (
        /* loading */
        <Spin style={{ marginLeft: '1vw' }} indicator={<LoadingOutlined />} />
      ) : (
        /* number input */
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
          disabled={isLoading || isDisabled}
          onKeyUp={handleKeyPress}
          onBlur={beforeSubmit}
          style={{ width: '100%' }}
        />
      )}
    </InputBlockContainer>
  );
};

// PROP TYPES
NumberInputBlock.propTypes = {
  /** Input title */
  title: PropTypes.string,
  /** Input name */
  name: PropTypes.string,
  /** Input tip */
  tip: PropTypes.string,
  /** Input minimum value */
  min: PropTypes.number,
  /** Input maximum value */
  max: PropTypes.number,
  /** Input value step  */
  step: PropTypes.number,
  /** Input placeholder */
  placeholder: PropTypes.number,
  /** Input value */
  value: PropTypes.number,
  /** Input change handler */
  handleChange: PropTypes.func.isRequired,
  /** Input is disabled*/
  isDisabled: PropTypes.bool.isRequired,
  /** Input is loading */
  isLoading: PropTypes.bool.isRequired,
};

// PROP DEFAULT VALUES
NumberInputBlock.defaultProps = {
  /** Input tip */
  tip: undefined,
  /** Input value */
  value: undefined,
  /** Input value step */
  step: undefined,
  /** Input value placeholder */
  placeholder: undefined,
  /** Input title */
  title: undefined,
  /** Input name */
  name: undefined,
  /** Input minimum value */
  min: undefined,
  /** Input maximum value */
  max: undefined,
};

// EXPORT
export default NumberInputBlock;
