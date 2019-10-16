/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const projectsApi = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:3000',
});

export const getAllProjects = async () => {
  try {
    const response = await projectsApi.get(`/projects`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getProject = async (id) => {
  try {
    const response = await projectsApi.get(`/projects/${id}`);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const createProject = async (projectName) => {
  try {
    const body = {
      name: projectName,
    };
    const response = await projectsApi.post(`/projects/`, body);

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
    const response = await projectsApi.patch(`/projects/${id}`, body);

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getExperimentList = async (id) => {
  try {
    const response = await projectsApi.get(`/projects/${id}/experiments`);

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
    const response = await projectsApi.post(
      `/projects/${id}/experiments/`,
      body
    );

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateExperiment = async (projectId, experimentId, body) => {
  try {
    const response = await projectsApi.patch(
      `/projects/${projectId}/experiments/${experimentId}`,
      body
    );

    return response;
  } catch (error) {
    console.error(error.message);
    if (error.response) message.error(error.response.data.message);
  }
};

// \"name\": \"Auto-featuring Experiment\",
// \"pipelineIdTrain\": \"23266cfd-4ed6-43d6-b8a0-ca8440d251c6\",
// \"pipelineIdDeploy\": \"fe5205f5-7f76-4f57-84ca-ea6dd62670e8\",
// \"datasetId\": \"0a10c0ac-ff3b-42df-ab7a-dc2962a1750c\",
// \"headerId\": \"482b603f-23c1-4a10-9b79-8c5b91c6c0cb\",
// \"targetColumnId\": \"3191a035-97a6-4e29-90d4-034cb1f87237\",
// \"parameters\": \"{ price: 8, auto-featuring: true }\",
// \"position\": 1
