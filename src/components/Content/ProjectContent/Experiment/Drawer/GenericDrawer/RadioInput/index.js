// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Radio } from 'antd';

// COMPONENTS
import InputTip from '../../InputTip';

// RADIO COMPONENTS
const { Group } = Radio;

/**
 * Radio Input.
 * This component is responsible for displaying radio input in generic drawer.
 */
const RadioInput = ({
  title,
  description,
  warning,
  tip,
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
    {/* radio input */}
    <Group onChange={handleChange} value={value}>
      {/* rendering radio options */}
      {options.map((option) => (
        <Radio
          style={{
            display: 'block',
          }}
          key={option.uuid}
          value={option.uuid}
        >
          {option.name}
        </Radio>
      ))}
    </Group>
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
RadioInput.propTypes = {
  /** radio input title string */
  title: PropTypes.string,
  /** radio input description string */
  description: PropTypes.string,
  /** radio input warning message string */
  warning: PropTypes.string,
  /** radio input tip message string */
  tip: PropTypes.string,
  /** radio input value id string */
  value: PropTypes.string,
  /** radio input options list */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** radio input change handler */
  handleChange: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
RadioInput.defaultProps = {
  /** radio input warning message string */
  warning: undefined,
  /** radio input tip message string */
  tip: undefined,
  /** radio input value id string */
  value: undefined,
  /** radio input title string */
  title: undefined,
  /** radio input description string */
  description: undefined,
};

// EXPORT
export default RadioInput;
