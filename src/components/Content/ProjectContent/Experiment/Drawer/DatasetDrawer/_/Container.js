// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DatasetDrawer from './index';

// ACTIONS
import { updateDatasetColumnRequest } from '../../../../../../../store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // update dataset column
    handleUpdateDatasetColumn: (datasetName, columnName, columnNewType) =>
      dispatch(
        updateDatasetColumnRequest(datasetName, columnName, columnNewType)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    dataset: state.datasetReducer,
    loading: state.uiReducer.datasetOperator.loading,
    trainingLoading: state.uiReducer.experimentTraining.loading,
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
  const {
    dataset,
    loading,
    trainingLoading,
    handleUpdateDatasetColumn,
  } = props;

  // HANDLERS
  // update dataset column
  const updateDatasetColumnHandler = (columnName, columnNewValue) =>
    handleUpdateDatasetColumn(columnName, columnNewValue);

  // RENDER
  return (
    <DatasetDrawer
      columns={dataset.columns}
      handleSetColumnType={updateDatasetColumnHandler}
      loading={loading}
      trainingLoading={trainingLoading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
