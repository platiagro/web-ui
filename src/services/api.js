/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const api = axios.create({
  baseURL: 'http://10.202.71.185:3000',
});

export const getAllProjects = async () => {
  try {
    const response = await api.get(`/projects`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateProject = async (id, name) => {
  try {
    const body = {
      newName: name,
    };
    const response = await api.patch(`/projects/${id}`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getExperimentList = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/experiments`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};
