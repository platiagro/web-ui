/* global ProjectsStore */

/** @type {ProjectsStore} */
const initialState = {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: 0,
  pageSize: 0,
  total: 0,
  isLoading: false,
};

export default initialState;
