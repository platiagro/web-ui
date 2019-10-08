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

export const updateProject = async (id, projectName) => {
  try {
    const body = {
      name: projectName,
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

export const createExperiment = async (id, experimentName) => {
  try {
    const body = {
      name: experimentName,
    };
    const response = await api.post(`/projects/${id}/experiments/`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateExperiment = async (
  projectId,
  experimentId,
  experimentName
) => {
  try {
    const body = {
      name: experimentName,
    };
    const response = await api.patch(
      `/projects/${projectId}/experiments/${experimentId}`,
      body
    );

    return response;
  } catch (error) {
    message.error(error.message);
  }
};
