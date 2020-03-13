/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const taskApi = axios.create({
  baseURL: URL,
});

export const getAllTasks = async () => {
  try {
    const response = await taskApi.get(`/components`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getTask = async (id) => {
  try {
    const response = await taskApi.get(`/components/${id}`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const createTask = async (task) => {
  try {
    const body = {
      copy_from: task.template === 'uuid' ? '' : task.template,
      name: task.name,
      description: task.description,
    };
    const response = await taskApi.post(`/components`, body);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const updateTask = async (uuid, task) => {
  try {
    const body = {
      name: task.name,
      description: task.description,
    };
    const response = await taskApi.patch(`/components/${uuid}`, body);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await taskApi.delete(`/components/${id}`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
