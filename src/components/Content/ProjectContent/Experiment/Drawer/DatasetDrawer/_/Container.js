// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DatasetDrawer from './index';

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 *
 */
const DatasetDrawerContainer = () => {
  // RENDER
  return <DatasetDrawer />;
};

// EXPORT
export default connect(null, null)(DatasetDrawerContainer);
