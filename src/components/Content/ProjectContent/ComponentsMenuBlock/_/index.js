// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row, Col } from 'antd';

// COMPONENTS
import ComponentsMenuSearch from '../ComponentsMenuSearch';

/**
 * Components Menu Block.
 * This component is responsible for displaying components menu with search.
 */
const ComponentsMenuBlock = () => {
  return (
    <div>
      <ComponentsMenuSearch handleChange={(e) => alert(e.target.value)} />
    </div>
  );
};

// EXPORT
export default ComponentsMenuBlock;
