// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { UploadInputBlock } from 'components';

// ACTIONS
import {
  startDatasetUpload,
  cancelDatasetUpload,
  datasetUploadFail,
  datasetUploadSuccess,
} from 'store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // start dataset upload
    handleUploadStart: () => dispatch(startDatasetUpload()),
    handleUploadCancel: () => dispatch(cancelDatasetUpload()),
    handleUploadFail: () => dispatch(datasetUploadFail()),
    handleUploadSuccess: (dataset, projectId, experimentId) =>
      dispatch(datasetUploadSuccess(dataset, projectId, experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.datasetOperator.loading,
    trainingSucceeded: state.experimentReducer.succeeded,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

const DatasetUploadInputBlockContainer = (props) => {
  // destructuring props
  const {
    handleUploadCancel,
    handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
    loading,
    trainingSucceeded,
    trainingLoading,
  } = props;

  // CONSTANTS
  // project id and experiment id
  const { projectId, experimentId } = useParams();

  // tip
  const tip = 'Selecione os dados de entrada.';

  // title
  const title = 'Dados de entrada';

  // button text
  const buttonText = 'Importar';

  // action url
  const actionUrl = 'http://10.50.11.116/datasets/apis/datasets';

  // upload is disabled
  const isDisabled = trainingLoading || trainingSucceeded;

  // upload is loading
  const isLoading = loading;

  // handlers
  const containerHandleUploadSuccess = (dataset) =>
    handleUploadSuccess(dataset, projectId, experimentId);

  // rendering component
  return (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      handleUploadCancel={handleUploadCancel}
      handleUploadFail={handleUploadFail}
      handleUploadStart={handleUploadStart}
      handleUploadSuccess={containerHandleUploadSuccess}
      isDisabled={isDisabled}
      isLoading={isLoading}
      tip={tip}
      title={title}
    />
  );
};

DatasetUploadInputBlockContainer.propTypes = {
  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

  /** Upload fail handler */
  handleUploadFail: PropTypes.func.isRequired,

  /** Upload start handler */
  handleUploadStart: PropTypes.func.isRequired,

  /** Upload success handler */
  handleUploadSuccess: PropTypes.func.isRequired,

  /** Dataset is uploading */
  loading: PropTypes.bool.isRequired,

  /** Experiment is running */
  trainingLoading: PropTypes.bool.isRequired,

  /** Experiment is succeeded */
  trainingSucceeded: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetUploadInputBlockContainer);
