import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepEqualSelector } from 'hooks';

import { UploadInputBlock } from 'components/InputBlocks';

import {
  startFileDatasetUpload,
  cancelDatasetUpload,
  deleteDeploymentDatasetRequest,
  changeDataset,
} from 'store/dataset/actions';

const datasetsLoadingSelector = ({ uiReducer }) => {
  return uiReducer.datasetsList.loading;
};

const datasetFileNameSelector = ({ datasetReducer }) => {
  return datasetReducer.filename;
};

const datasetStatusSelector = ({ datasetReducer }) => {
  return datasetReducer.status;
};

const uploadProgressSelector = ({ datasetReducer }) => {
  return datasetReducer.progress;
};

const isUploadingSelector = ({ datasetReducer }) => {
  return datasetReducer.isUploading;
};

const selectedOperatorDatasetSelector = ({ operatorReducer }) => {
  return operatorReducer.parameters.find((param) => param.name === 'dataset');
};

const DeploymentDatasetUploadContainer = () => {
  const { projectId, deploymentId } = useParams();

  const dispatch = useDispatch();

  const title = 'Arquivo local';
  const tip = 'Selecione os dados de entrada.';
  const buttonText = 'Importar';
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

  const datasetSelected = useDeepEqualSelector(selectedOperatorDatasetSelector);
  const datasetsLoading = useDeepEqualSelector(datasetsLoadingSelector);
  const datasetFileName = useDeepEqualSelector(datasetFileNameSelector);
  const datasetStatus = useDeepEqualSelector(datasetStatusSelector);
  const uploadProgress = useDeepEqualSelector(uploadProgressSelector);
  const isUploading = useDeepEqualSelector(isUploadingSelector);

  const defaultFileList = isUploading
    ? [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: datasetStatus,
          percent: uploadProgress,
        },
      ]
    : datasetFileName && [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: 'done',
        },
      ];

  useEffect(() => {
    dispatch(changeDataset(datasetSelected));
  }, [dispatch, datasetSelected]);

  const containerHandleUploadCancel = () =>
    isUploading
      ? dispatch(cancelDatasetUpload())
      : dispatch(deleteDeploymentDatasetRequest(projectId, deploymentId));

  const customUploadHandler = (data) =>
    dispatch(startFileDatasetUpload(data.file, projectId, null, deploymentId));

  // rendering component
  return (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      datasets={[]}
      datasetsLoading={datasetsLoading}
      handleUploadCancel={containerHandleUploadCancel}
      customRequest={customUploadHandler}
      tip={tip}
      title={title}
      defaultFileList={defaultFileList}
      deployment={true}
    />
  );
};

// EXPORT DEFAULT
export default DeploymentDatasetUploadContainer;
