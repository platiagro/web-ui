// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */

// ACTION TYPES
import { EXPERIMENTS_TYPES } from './experiments';
import EXPERIMENTS_RUNS_TYPES from './experiments/experimentRuns/actionTypes';
import * as PROJECTS_TYPES from './projects.actionTypes';

/** @type {ProjectsStore} */
export const initialState = {
  projects: [],
  selectedProjects: [],
  searchText: '',
  currentPage: 0,
  pageSize: 0,
  total: 0,
};

/**
 * Projects Module Reducer (Projects + Experiments)
 *
 * @param {ProjectsStore} state Reducer initial state
 * @param {object} action Reducer action
 * @param {object} action.payload Action payload (data)
 * @param {string} action.type Action type
 * @returns {ProjectsStore} New state
 */
export default (state = initialState, action = undefined) => {
  switch (action.type) {
    case PROJECTS_TYPES.DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: action.payload.selectedProjects,
      };

    case PROJECTS_TYPES.CREATE_PROJECT_SUCCESS:
    case PROJECTS_TYPES.FETCH_PROJECT_SUCCESS:
    case PROJECTS_TYPES.UPDATE_PROJECT_SUCCESS:
    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS:
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_OPERATOR_STORE_DATA:
    case EXPERIMENTS_RUNS_TYPES.EXPERIMENT_RUN_NOT_SUCCEEDED: // TODO: Acho que não é uma boa prática um reducer filtrar ações de outras stores
    case EXPERIMENTS_RUNS_TYPES.EXPERIMENT_RUN_SUCCEEDED:
      return {
        ...state,
        projects: action.payload.projects,
      };

    case PROJECTS_TYPES.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload.projects,
        selectedProjects: [],
        searchText: action.payload.searchText,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        total: action.payload.total,
      };

    case PROJECTS_TYPES.SELECTED_PROJECTS:
      return {
        ...state,
        selectedProjects: action.payload.selectedProjects,
      };

    default:
      return state;
  }
};
