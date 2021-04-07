/* global ProjectsStore */

/** @type {ProjectsStore} */
const initialState = {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: null,
  pageSize: null,
  total: null,
  isLoading: false,
};

export default initialState;
