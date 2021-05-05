// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */
import * as EXPERIMENTS_TYPES from './experiments.actionTypes';
import EXPERIMENTS_RUNS_TYPES from './experimentRuns/actionTypes';

/**
 * Projects experiments reducer
 *
 * @param {ProjectsStore} state State object
 * @param {object} action Action object
 * @param {string} action.type Action type
 * @param {object} action.payload Action payload
 * @returns {ProjectsStore} New state
 */
export default (state, action) => {
  switch (action.type) {
    case EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_SUCCESS:
    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS:
    case EXPERIMENTS_RUNS_TYPES.EXPERIMENT_RUN_NOT_SUCCEEDED: // TODO: Acho que não é uma boa prática um reducer filtrar ações de outras stores
    case EXPERIMENTS_RUNS_TYPES.EXPERIMENT_RUN_SUCCEEDED:
      return { ...state, projects: action.payload.projects };

    default:
      return state;
  }
};
