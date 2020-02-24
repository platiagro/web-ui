// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Upload, Button, Icon, Divider, Select } from 'antd';

// COMPONENTS
import SelectInput from '../SelectInput';
import RadioInput from '../RadioInput';

// SELECT COMPONENTS
const { Option } = Select;

// INPUT TYPES
const inputTypes = {
  // select
  select: ({ uuid, ...props }) => (
    <SelectInput
      key={uuid}
      handleChange={(value) => alert(`(select) Valor selecionado: ${value}`)}
      {...props}
    />
  ),
  // radio
  radio: ({ uuid, ...props }) => (
    <RadioInput
      key={uuid}
      handleChange={(value) => alert(`(radio) Valor selecionado: ${value}`)}
      {...props}
    />
  ),
};

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 */
const GenericDrawer = ({ drawerInputs }) => (
  <div>{drawerInputs.map((input) => inputTypes[input.type](input))}</div>
);

// EXPORT
export default GenericDrawer;
