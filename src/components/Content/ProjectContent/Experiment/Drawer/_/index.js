// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

// COMPONENTS
import DatasetDrawer from '../DatasetDrawer';
// import ResultsDrawer from '../ResultsDrawer';
// import ResultsButtonBar from '../ResultsButtonBar';

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ title, visible, handleClose }) => (
  <AntDrawer title={title} visible={visible} closable onClose={handleClose}>
    <DatasetDrawer />
  </AntDrawer>
);

// EXPORT
export default Drawer;
