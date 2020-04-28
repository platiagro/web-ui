// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_DATASET_API || 'http://localhost:3000';
// api object
const datasetsApi = axios.create({
  baseURL: URL,
});
// datasets path
const datasetsPath = '/datasets';

// API METHODS
/**
 * List Dataset Columns
 * @param {string} datasetName
 * @returns {Promise}
 */
const listDatasetColumns = (datasetName) =>
  new Promise((resolve, reject) => {
    // requesting datasets
    datasetsApi
      .get(`${datasetsPath}/${datasetName}/columns`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Create Dataset
 * @param {Object} formData form with dataset and feature types (header) files
 * @returns {Promise}
 */
const createDataset = (formData) =>
  new Promise((resolve, reject) => {
    // creating dataset
    datasetsApi
      .post(datasetsPath, formData)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Update Dataset Column
 * @param {string} datasetName
 * @param {string} columnName
 * @param {string} columnNewType
 * @returns {Promise}
 */
const updateDatasetColumn = (datasetName, columnName, columnNewType) =>
  new Promise((resolve, reject) => {
    // creating body object
    const body = {
      featuretype: columnNewType,
    };

    // updating dataset column
    datasetsApi
      .patch(`${datasetsPath}/${datasetName}/columns/${columnName}`, body)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

/**
 * Detail Dataset
 * @param {string} datasetId
 * @returns {Promise}
 */
/* const detailDataset = (datasetId) =>
  new Promise((resolve, reject) => {
    // requesting dataset
    datasetsApi
      .get(`${datasetsPath}/${datasetId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

/**
 * Delete Dataset
 * @param {string} datasetId
 * @returns {Promise}
 */
/* const deleteDataset = (datasetId) =>
  new Promise((resolve, reject) => {
    // deleting dataset
    datasetsApi
      .delete(`${datasetsPath}/${datasetId}`)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  }); */

// EXPORT DEFAULT
export default {
  listDatasetColumns,
  createDataset,
  updateDatasetColumn,
  /*     detailDataset,
  deleteDataset, */
};
