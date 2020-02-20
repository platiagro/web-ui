// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Upload, Button, Icon, Divider, Select } from 'antd';

// COMPONENTS
import SelectInput from '../SelectInput';

// MOCKS
import genericDrawerMock from './_genericDrawerMock';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * Dataset Drawer.
 * This component is responsible for displaying dataset content in drawer.
 */
const GenericDrawer = () => (
  <div>
    {genericDrawerMock.map((input) => (
      <SelectInput handleChange={(value) => alert(value)} {...input} />
    ))}
  </div>
);

// EXPORT
export default GenericDrawer;
