// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import DatasetDrawer from './index';

// ACTIONS
import { fetchDatasetColumnsRequest } from '../../../../../../../store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // fetch dataset columns
    handleFetchDatasetColumns: (datasetName) =>
      dispatch(fetchDatasetColumnsRequest(datasetName)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    datasetName: state.experiment.dataset,
    targetColumn: state.experiment.target,
  };
};

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DatasetDrawerContainer = ({
  dataset,
  datasetName,
  targetColumn,
  handleFetchDatasetColumns,
}) => {
  // CONSTANTS
  // getting experiment uuid
  /*   const { operatorId } = useParams(); */

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching dataset columns
    if (datasetName) handleFetchDatasetColumns(datasetName);
  }, []);

  // HANDLERS
  /*   const addFlowTaskHandler = (taskUuid) =>
    handleAddFlowTask(experimentUuid, taskUuid); */

  // RENDER
  return (
    <DatasetDrawer columns={dataset.columns} targetColumnId={targetColumn} />
  );
};

// EXPORT
export default connect(mapStateToProps, null)(DatasetDrawerContainer);
