/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const dataSetApi = axios.create({
  baseURL: process.env.REACT_APP_DATASET_API || '/datasets/apis',
});

export const getDataSet = async (id) => {
  try {
    const response = await dataSetApi.get(`/datasets/${id}`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getHeader = async (id) => {
  try {
    const response = await dataSetApi.get(`/headers/${id}`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getHeaderColumns = async (id) => {
  try {
    const response = await dataSetApi.get(`/headers/${id}/columns`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateColumn = async (headerId, columnId, newType) => {
  try {
    const body = {
      datatype: newType,
    };

    const response = await dataSetApi.patch(
      `/headers/${headerId}/columns/${columnId}`,
      body
    );

    return response;
  } catch (error) {
    console.error(error);
    message.error(error.response.data.message);
  }
};

export const uploadDataSet = async (form) => {
  try {
    const response = await dataSetApi.post(`/datasets`, form);
    message.success('Importação concluída.');

    return response;
  } catch (error) {
    console.error(error.message);
    message.error(error.response.data.message, 5);
  }
};
