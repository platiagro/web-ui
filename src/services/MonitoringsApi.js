// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const monitoringApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const requestMonitoring = (projectId) => {
  return monitoringApi.get(`${projectId}/monitorings`);
};

const postMonitoring = (projectId, body) => {
  return monitoringApi.post(`${projectId}/monitorings`, body);
};

const putMonitoring = (projectId, monitoringId, body) => {
  return monitoringApi.put(`${projectId}/monitorings/${monitoringId}`, body);
};

const deleteMonitoring = (projectId) => {
  return monitoringApi.delete(`${projectId}`);
};

// EXPORT DEFAULT
export default {
  requestMonitoring,
  deleteMonitoring,
  putMonitoring,
  postMonitoring,
};
