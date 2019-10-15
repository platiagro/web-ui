/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const resultsApi = axios.create({
  baseURL: process.env.REACT_APP_DATASET_API || '/datasets/apis',
});

export const getResultTable = async (experimentId, task, headerId) => {
  try {
    const response = await resultsApi.get(
      `/results/${experimentId}/${task}/${headerId}`
    );

    return response.data.payload;
  } catch (error) {
    message.error(error.message);
  }
};

export const getDatasetTable = async (experimentId, datasetId) => {
  try {
    const response = await resultsApi.get(
      `/results/${experimentId}/dataset/${datasetId}`
    );

    return response.data.payload;
  } catch (error) {
    message.error(error.message);
  }
};

export const getConfusionMatrix = async (experimentId) => {
  try {
    const response = await resultsApi.get(
      `/results/${experimentId}/confusionMatrix/`,
      { responseType: 'blob' }
    );

    console.log(response.data);

    // Obtain a blob: URL for the image data.
    // const arrayBufferView = new Uint8Array(response.data);
    // const blob = new Blob(response.data);
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(response.data);

    return imageUrl;
  } catch (error) {
    message.error(error.message);
  }
};
