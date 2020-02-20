// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Select } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * Select Input.
 * This component is responsible for displaying select input in generic drawer.
 */
const SelectInput = ({
  title,
  description,
  warning,
  tip,
  isMultiple,
  placeholder,
  value,
  options,
  handleChange,
}) => (
  // div container
  <div>
    {/* title */}
    <p>{title}</p>
    {/* description */}
    <small>{description}</small>
    {/* select input */}
    <Select
      onChange={handleChange}
      mode={isMultiple ? 'multiple' : null}
      style={{ width: '80%' }}
      placeholder={placeholder}
      value={value}
    >
      {/* rendering select options */}
      {options.map((option) => (
        <Option key={option.uuid} value={option.uuid}>
          {option.name}
        </Option>
      ))}
    </Select>
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
SelectInput.propTypes = {
  /** select input title string */
  title: PropTypes.string.isRequired,
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
