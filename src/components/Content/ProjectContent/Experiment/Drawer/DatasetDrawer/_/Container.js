// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DatasetDrawer from './index';

// STATES
const mapStateToProps = (state) => {
  return {
    datasetColumns: state.datasetReducer.columns,
  };
};

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 *
 * @param props
 */
const DatasetDrawerContainer = (props) => {
  // destructuring props
  const { datasetColumns } = props;

  // RENDER
  return <DatasetDrawer columns={datasetColumns} />;
};

// EXPORT
export default connect(mapStateToProps, null)(DatasetDrawerContainer);
