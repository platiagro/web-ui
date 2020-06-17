/* eslint-disable consistent-return */
import axios from 'axios';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const taskApi = axios.create({
  baseURL: URL,
});

export const getAllTasks = async () => {
  return taskApi.get(`/components`);
};

export const createTask = async (task) => {
  const body = {
    copy_from: task.template === 'uuid' ? '' : task.template,
    name: task.name,
    description: task.description,
  };
  return taskApi.post(`/components`, body);
};

export const updateTask = async (uuid, task) => {
  const body = {
    name: task.name,
    description: task.description,
  };
  return taskApi.patch(`/components/${uuid}`, body);
};

export const deleteTask = async (id) => {
  return taskApi.delete(`/components/${id}`);
};
