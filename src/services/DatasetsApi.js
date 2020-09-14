// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_DATASET_API || 'http://localhost:8080';
// api object
const datasetsApi = axios.create({
  baseURL: URL,
});
// datasets path
const datasetsPath = '/datasets';

// API METHODS
/**
 * Get Dataset
 *
 * @param {string} datasetName
 * @param {int} page
 * @param {int} pageSize
 * @returns {Promise}
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
 * @param {string} datasetName
 * @returns {Promise}
 */
const listDatasetColumns = (datasetName) => {
  return datasetsApi.get(`${datasetsPath}/${datasetName}/columns`);
};

/**
 * Create Google Dataset
 *
 * @param {object} gfile
 * @returns {Promise}
 */
const createGoogleDataset = (gfile) => {
  return datasetsApi.post(datasetsPath, { gfile });
};

/**
 * Update Dataset Column
 *
 * @param {string} datasetName
 * @param {string} columnName
 * @param {string} columnNewType
 * @returns {Promise}
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
 * @param {string} datasetName
 * @returns {Promise}
 */
const getDatasetFeaturetypes = (datasetName) => {
  return datasetsApi.get(`${datasetsPath}/${datasetName}/featuretypes`);
};

// EXPORT DEFAULT
export default {
  listDatasetColumns,
  createGoogleDataset,
  updateDatasetColumn,
  getDataset,
  getDatasetFeaturetypes,
};
