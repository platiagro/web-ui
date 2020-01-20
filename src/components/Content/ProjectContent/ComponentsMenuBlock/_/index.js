// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import ComponentsMenuSearch from '../ComponentsMenuSearch';
import ComponentsMenu from '../ComponentsMenu';

// MOCKS
import componentsMock from './_componentsMock';

/**
 * Components Menu Block.
 * This component is responsible for displaying components menu with search.
 */
const ComponentsMenuBlock = () => {
  return (
    <div>
      <ComponentsMenuSearch handleChange={(e) => alert(e.target.value)} />
      <ComponentsMenu components={componentsMock} />
    </div>
  );
};

// EXPORT
export default ComponentsMenuBlock;
