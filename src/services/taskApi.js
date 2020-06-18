// CORE LIBS
import axios from 'axios';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const taskApi = axios.create({
  baseURL: URL,
});

const taskPath = '/components';

/**
 * Create task
 * @param {Object} task
 * @returns {Promise}
 */
export const createTask = (task) => {
  const body = {
    copy_from: task.template === 'uuid' ? '' : task.template,
    name: task.name,
    description: task.description,
  };
  return taskApi.post(taskPath, body);
};

/**
 * Delete task
 * @param {String} id
 * @returns {Promise}
 */
export const deleteTask = (id) => {
  return taskApi.delete(`${taskPath}/${id}`);
};

/**
 * Get all tasks
 * @returns {Promise}
 */
export const getAllTasks = () => {
  return taskApi.get(taskPath);
};

/**
 * Update task
 * @param {String} uuid
 * @param {Object} task
 * @returns {Promise}
 */
export const updateTask = (uuid, task) => {
  const body = {
    name: task.name,
    description: task.description,
  };
  return taskApi.patch(`${taskPath}/${uuid}`, body);
};
