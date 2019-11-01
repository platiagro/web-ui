/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000';

export const uploadUrl = `${URL}/components/upload`;

export const downloadUrl = `${URL}/components/download`;

export const componentsApi = axios.create({
  baseURL: URL,
});

export const getAllComponents = async () => {
  try {
    const response = await componentsApi.get(`/components`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getComponent = async (id) => {
  try {
    const response = await componentsApi.get(`/components/${id}`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const createComponent = async (componentName) => {
  try {
    const body = {
      name: componentName,
    };
    const response = await componentsApi.post(`/components/`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateComponent = async (id, componentName) => {
  try {
    const body = {
      name: componentName,
    };
    const response = await componentsApi.patch(`/components/${id}`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateParameters = async (id, componentParameters) => {
  try {
    const body = {
      parameters: componentParameters,
    };
    const response = await componentsApi.patch(`/components/${id}`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const deleteFiles = async (id, componentFiles) => {
  try {
    const body = {
      files: componentFiles,
    };
    const response = await componentsApi.post(
      `/components/deleteFiles/${id}`,
      body
    );
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const deleteComponent = async (id) => {
  try {
    const response = await componentsApi.delete(`/components/${id}`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
