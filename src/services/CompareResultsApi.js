// CORE LIBS
import axios from 'axios';

const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';
const comparisonsApi = axios.create({
  baseURL: `${URL}/projects`,
});
const comparisonsPath = '/comparisons';

const createCompareResult = (projectId) => {
  return comparisonsApi.post(`/${projectId}${comparisonsPath}`);
};

const deleteCompareResult = (projectId, compareResultId) => {
  return comparisonsApi.delete(
    `/${projectId}${comparisonsPath}/${compareResultId}`
  );
};

const listCompareResult = (projectId) => {
  return comparisonsApi.get(`/${projectId}${comparisonsPath}`);
};

const updateCompareResult = (projectId, compareResultId, body) => {
  return comparisonsApi.patch(
    `/${projectId}${comparisonsPath}/${compareResultId}`,
    body
  );
};

// EXPORT DEFAULT
export default {
  createCompareResult,
  deleteCompareResult,
  listCompareResult,
  updateCompareResult,
};
