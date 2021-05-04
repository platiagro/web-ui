// correção de bug do eslint/jsdoc
/* eslint-disable-next-line */
/* global ProjectsStore */
import * as EXPERIMENTS_TYPES from './experiments.actionTypes';

/**
 * Projects experiments reducer
 *
 * @param {ProjectsStore} state State object
 * @param {object} action Action object
 * @param {string} action.type Action type
 * @param {object} action.payload Action payload
 * @returns {ProjectsStore} New state
 */
const experimentsReducer = (state, action) => {
  switch (action.type) {
    case EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_SUCCESS:
    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS:
    case EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS:
      return { ...state, projects: action.payload.projects };

    default:
      return state;
  }
};

export default experimentsReducer;
