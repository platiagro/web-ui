import { createAxiosInstance } from 'services/factories';

const URL = process.env.REACT_APP_DATASET_API || 'http://localhost:8080';

const datasetsApi = createAxiosInstance({
  baseURL: URL,
});

const datasetsPath = '/datasets';

/**
 * List all datasets
 *
 * @returns {Promise} Request Promise
 */
const listDatasets = () => {
  return datasetsApi.get(datasetsPath);
};

/**
 * Get Dataset
 *
 * @param {string} datasetName The dataset name
 * @param {number} page Number of pages
 * @param {number} pageSize Data per page
 * @returns {Promise} Request Promise
 */
const getDataset = (datasetName, page, pageSize) => {
  if (page && pageSize)
    return datasetsApi.get(
      `${datasetsPath}/${datasetName}?page=${page}&page_size=${pageSize}`
    );
  else return datasetsApi.get(`${datasetsPath}/${datasetName}`);
};

/**
 * List Dataset Columns
 *
 * @param {string} datasetName The dataset name
 * @returns {Promise} Request Promise
 */
const listDatasetColumns = (datasetName) => {
  return datasetsApi.get(`${datasetsPath}/${datasetName}/columns`);
};

/**
 * Create Dataset
 *
 * @param {File} file Dataset file
 * @param {object} cancelToken Cancel token
 * @param {Function} progressHandler Upload progress handler
 * @returns {Promise} Request Promise
 */
const createDataset = (file, cancelToken, progressHandler) => {
  // return promise
  return datasetsApi.post(datasetsPath, file, {
    cancelToken: cancelToken.token,
    onUploadProgress: (progress) => progressHandler(progress),
  });
};

/**
 * Update Dataset Column
 *
 * @param {string} datasetName The dataset name
 * @param {string} columnName Column name
 * @param {string} columnNewType The new type of the column
 * @returns {Promise} Request Promise
 */
const updateDatasetColumn = (datasetName, columnName, columnNewType) => {
  // creating body object
  const body = {
    featuretype: columnNewType,
  };

  // updating dataset column
  return datasetsApi.patch(
    `${datasetsPath}/${datasetName}/columns/${columnName}`,
    body
  );
};

/**
 * Get featuretypes of a Dataset
 *
 * @param {string} datasetName The dataset name
 * @returns {Promise} Request Promise
 */
const getDatasetFeaturetypes = (datasetName) => {
  return datasetsApi.get(`${datasetsPath}/${datasetName}/featuretypes`);
};

export default {
  listDatasets,
  listDatasetColumns,
  updateDatasetColumn,
  getDataset,
  getDatasetFeaturetypes,
  createDataset,
  axiosInstance: datasetsApi,
};
