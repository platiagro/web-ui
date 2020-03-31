// CORE LIBS
import axios from 'axios';

// CONSTANTS
// api base url
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:3000';
// api object
const pipelinesApi = axios.create({
  baseURL: `${URL}`,
});
// train path
const trainPath = '/train';

/**
 * Train Experiment
 * @param {Object} trainObject
 * @returns {Promise}
 */
const trainExperiment = (trainObject) =>
  new Promise((resolve, reject) => {
    // training experiment
    pipelinesApi
      .post(`${trainPath}`, trainObject)
      // success
      .then((response) => resolve(response))
      // error
      .catch((error) => reject(error));
  });

// EXPORT DEFAULT
export default {
  trainExperiment,
};
