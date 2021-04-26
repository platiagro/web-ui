// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */

/** @type {ProjectsStore} */
export default {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: 0,
  pageSize: 0,
  total: 0,
  isLoading: false,
};
