import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const AttributeFilterDrawerContent = ({ dataSets, parameter, setFilter }) => {
  return (
    <div>
      <p>Atributos excluídos</p>
      <p>
        <small>Selecione os atributos que serão excluídos.</small>
      </p>
      <Select
        onChange={setFilter}
        value={parameter}
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Selecione'
      >
        {dataSets.map((item) => (
          <Option key={item.uuid} value={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

AttributeFilterDrawerContent.propTypes = {
  dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default AttributeFilterDrawerContent;
