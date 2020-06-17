/* eslint-disable consistent-return */
import axios from 'axios';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const taskApi = axios.create({
  baseURL: URL,
});

export const getAllTasks = async () => {
  return new Promise((resolve, reject) => {
    taskApi
      .get(`/components`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const createTask = (task) => {
  const body = {
    copy_from: task.template === 'uuid' ? '' : task.template,
    name: task.name,
    description: task.description,
  };
  return new Promise((resolve, reject) => {
    taskApi
      .post(`/components`, body)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const updateTask = async (uuid, task) => {
  const body = {
    name: task.name,
    description: task.description,
  };
  return new Promise((resolve, reject) => {
    taskApi
      .patch(`/components/${uuid}`, body)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const deleteTask = async (id) => {
  return new Promise((resolve, reject) => {
    taskApi
      .delete(`/components/${id}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};
