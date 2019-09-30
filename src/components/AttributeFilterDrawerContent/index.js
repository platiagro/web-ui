import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

const AttributeFilterDrawerContent = () => (
  <div>
    <p>Atributos excluídos</p>
    <p>
      <small>Selecione os atributos que serão excluídos.</small>
    </p>
    <Select mode='multiple' style={{ width: '100%' }} placeholder='Selecione'>
      <Option value='typeOne'>Tipo Um</Option>
      <Option value='typeTwo'>Tipo Dois</Option>
      <Option value='typeThree'>Tipo Três</Option>
      <Option value='typeFour'>Tipo Quatro</Option>
    </Select>
  </div>
);

export default AttributeFilterDrawerContent;
