// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import {
  GoogleUploadInputBlock,
  UploadInputBlock,
} from 'components/InputBlocks';

// ACTIONS
import {
  startDatasetUpload,
  cancelDatasetUpload,
  createGoogleDataset,
  datasetUploadFail,
  datasetUploadSuccess,
  deleteDatasetRequest,
} from 'store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateGoogleDataset: (projectId, experimentId, file) =>
      dispatch(createGoogleDataset(projectId, experimentId, file)),
    handleUploadStart: () => dispatch(startDatasetUpload()),
    handleDeleteDataset: (projectId, experimentId) =>
      dispatch(deleteDatasetRequest(projectId, experimentId)),
    handleUploadCancel: () => dispatch(cancelDatasetUpload()),
    handleUploadFail: () => dispatch(datasetUploadFail()),
    handleUploadSuccess: (dataset, projectId, experimentId) =>
      dispatch(datasetUploadSuccess(dataset, projectId, experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    datasetFileName: state.datasetReducer.filename,
    datasetStatus: state.datasetReducer.status,
    loading: state.uiReducer.datasetOperator.loading,
    operatorName: state.operatorReducer.name,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

const DatasetUploadInputBlockContainer = (props) => {
  const {
    datasetFileName,
    datasetStatus,
    loading,
    operatorName,
    trainingLoading,
  } = props;
  const {
    handleCreateGoogleDataset,
    handleUploadCancel,
    handleDeleteDataset,
    handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
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
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

  // upload is disabled
  const isDisabled = trainingLoading;

  // upload is loading
  const isLoading = loading;

  // default file list
  const defaultFileList = datasetFileName
    ? [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: datasetStatus ? datasetStatus : 'done',
        },
      ]
    : undefined;

  // check if is google drive dataset
  const isGoogleDrive = operatorName === 'Google Drive';

  // handlers
  const containerHandleCreateGoogleDataset = (file) =>
    handleCreateGoogleDataset(projectId, experimentId, file);

  const containerHandleUploadSuccess = (dataset) =>
    handleUploadSuccess(dataset, projectId, experimentId);

  const containerHandleUploadCancel = () =>
    datasetFileName
      ? handleDeleteDataset(projectId, experimentId)
      : handleUploadCancel();

  // rendering component
  return isGoogleDrive ? (
    <GoogleUploadInputBlock
      defaultFileList={defaultFileList}
      handleCreateGoogleDataset={containerHandleCreateGoogleDataset}
      handleUploadCancel={containerHandleUploadCancel}
      isDisabled={isDisabled}
      isLoading={isLoading}
      tip={tip}
      title={title}
    />
  ) : (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      handleUploadCancel={containerHandleUploadCancel}
      handleUploadFail={handleUploadFail}
      handleUploadStart={handleUploadStart}
      handleUploadSuccess={containerHandleUploadSuccess}
      isDisabled={isDisabled}
      isLoading={isLoading}
      tip={tip}
      title={title}
      defaultFileList={defaultFileList}
    />
  );
};

DatasetUploadInputBlockContainer.propTypes = {
  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

  /** Delete dataset handler */
  handleDeleteDataset: PropTypes.func.isRequired,

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

  /** Dataset file name */
  datasetFileName: PropTypes.string,
};

DatasetUploadInputBlockContainer.defaultProps = {
  /** Dataset file name */
  datasetFileName: undefined,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetUploadInputBlockContainer);
