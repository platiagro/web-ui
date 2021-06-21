import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { UploadInputBlock } from 'components/InputBlocks';

import {
  selectDataset,
  startFileDatasetUpload,
  cancelDatasetUpload,
  deleteDatasetRequest,
} from 'store/dataset/actions';

import { fetchDatasetsRequest } from 'store/datasets/actions';

const DeploymentDatasetUploadContainer = () => {
  const { projectId, experimentId, deploymentId } = useParams();

  const dispatch = useDispatch();

  const title = 'Arquivo local';
  const tip = 'Selecione os dados de entrada.';
  const buttonText = 'Importar';
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

  // TODO: Criar seletores
  /* eslint-disable */
  const datasets = useSelector((state) => state.datasetsReducer);
  const datasetsLoading = useSelector(
    (state) => state.uiReducer.datasetsList.loading
  );
  const datasetFileName = useSelector((state) => state.datasetReducer.filename);
  const datasetStatus = useSelector((state) => state.datasetReducer.status);
  const uploadProgress = useSelector((state) => state.datasetReducer.progress);
  const isUploading = useSelector((state) => state.datasetReducer.isUploading);

  /* eslint-enable */

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
    dispatch(fetchDatasetsRequest());
  }, [dispatch]);

  const containerHandleUploadCancel = () =>
    isUploading
      ? dispatch(cancelDatasetUpload())
      : dispatch(deleteDatasetRequest(projectId, experimentId));

  const containerHandleSelectDataset = (dataset) =>
    dispatch(selectDataset(dataset, projectId, experimentId));

  const customUploadHandler = (data) =>
    dispatch(startFileDatasetUpload(data.file, projectId, null, deploymentId));

  // rendering component
  return (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      datasets={datasets}
      datasetsLoading={datasetsLoading}
      handleSelectDataset={containerHandleSelectDataset}
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
