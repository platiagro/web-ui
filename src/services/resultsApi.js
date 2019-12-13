/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const URL = process.env.REACT_APP_DATASET_API || '/datasets/apis';

export const resultsApi = axios.create({
  baseURL: URL,
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

export const getPlot = async (experimentId) => {
  try {
    const urlCreator = window.URL || window.webkitURL;
    const type = await resultsApi.get(`/results/${experimentId}/type/`);
    const plot = await resultsApi.get(`/results/${experimentId}/plot/`, {
      responseType: 'blob',
    });
    const imageUrl = urlCreator.createObjectURL(plot.data);
    const response = { type: type.data.type, imageUrl };
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
