// CORE LIBS
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Select } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

// SELECT COMPONENTS
const { Option, blur } = Select;

/**
 * Select Input.
 * This component is responsible for displaying select input in generic drawer.
 */
const SelectInput = ({
  title,
  label,
  name,
  loading,
  disabled,
  description,
  warning,
  tip,
  isMultiple,
  placeholder,
  value,
  options,
  handleChange,
}) => {
  // ref hook
  const selectRef = useRef(null);

  console.log(placeholder);

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
      {/* select input */}
      <Select
        ref={selectRef}
        onChange={(values) => {
          selectRef.current.blur();
          handleChange(values);
        }}
        mode={isMultiple ? 'multiple' : null}
        style={{ width: '80%' }}
        placeholder={placeholder}
        value={value}
        loading={loading}
        disabled={loading || disabled}
      >
        {/* rendering select options */}
        {options &&
          options.map((option) => {
            const { uuid, name } = option;
            return (
              <Option key={uuid || option} value={uuid || option}>
                {name || option}
              </Option>
            );
          })}
      </Select>
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
SelectInput.propTypes = {
  /** select input title string */
  title: PropTypes.string.isRequired,
  /** select input label string */
  label: PropTypes.string.isRequired,
  /** select input name string */
  name: PropTypes.string.isRequired,
  /** select input is loading */
  loading: PropTypes.bool.isRequired,
  /** select input is disabled */
  disabled: PropTypes.bool.isRequired,
  /** select input description string */
  description: PropTypes.string.isRequired,
  /** select input warning message string */
  warning: PropTypes.string,
  /** select input tip message string */
  tip: PropTypes.string,
  /** select input is multiple */
  isMultiple: PropTypes.bool.isRequired,
  /** select input placeholder string */
  placeholder: PropTypes.string.isRequired,
  /** select input value id string */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** select input options list */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** select input change handler */
  handleChange: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
SelectInput.defaultProps = {
  /** select input warning message string */
  warning: undefined,
  /** select input tip message string */
  tip: undefined,
  /** select input value id string */
  value: undefined,
};

// EXPORT
export default SelectInput;
