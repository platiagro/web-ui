/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const dataSetApi = axios.create({
  baseURL: process.env.REACT_APP_DATASET_API || 'http://localhost:3001',
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

export const updateColumn = async (headerId, columnId, datatype) => {
  try {
    const body = {
      datatype,
    };

    const response = await dataSetApi.patch(
      `/headers/${headerId}/columns/${columnId}`,
      body
    );

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const uploadDataSet = async (form) => {
  try {
    const response = await dataSetApi.post(`/datasets`, form);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};
