// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Select } from 'antd';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * Type Select.
 * This component is responsible for displaying type select in dataset drawer
 */
const TypeSelect = ({ value, ...others }) => {
  // getting value
  let fixedVal = value;
  // types regex
  const numRegex = /num/i;
  const dateRegex = /dat/i;
  const factorRegex = /fact|cate/i;
  // checking type
  if (value.match(numRegex)) {
    fixedVal = 'Numerical';
  } else if (value.match(dateRegex)) {
    fixedVal = 'DateTime';
  } else if (value.match(factorRegex)) {
    fixedVal = 'Categorical';
  }

  // rendering component
  return (
    // select component
    <Select value={fixedVal} {...others}>
      {/* options */}
      <Option value='DateTime'>Data/Hora</Option>
      <Option value='Numerical'>Numérico</Option>
      <Option value='Categorical'>Categórico</Option>
    </Select>
  );
};

// PROP TYPES
TypeSelect.propTypes = {
  /** type select value */
  value: PropTypes.string.isRequired,
  /** type select others */
  others: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default TypeSelect;
