import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const ColumnsTableTypeSelect = ({ value, ...others }) => {
  const fixedVal = useMemo(() => {
    const numRegex = /num/i;
    const dateRegex = /dat/i;
    const factorRegex = /fact|cate/i;

    if (value.match(numRegex)) return 'Numerical';
    else if (value.match(dateRegex)) return 'DateTime';
    else if (value.match(factorRegex)) return 'Categorical';
    return value;
  }, [value]);

  return (
    <Select value={fixedVal} {...others}>
      <Select.Option value='DateTime'>Data/Hora</Select.Option>
      <Select.Option value='Numerical'>Numérico</Select.Option>
      <Select.Option value='Categorical'>Categórico</Select.Option>
    </Select>
  );
};

ColumnsTableTypeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  others: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ColumnsTableTypeSelect;
