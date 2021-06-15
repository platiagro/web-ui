/* global TemplatesStore */
import * as actionTypes from './actionTypes';

/** @type {TemplatesStore} */
const initialState = [];

/**
 * Templates Store Module Reducer
 *
 * @param {TemplatesStore} state Reducer initial state
 * @param {object} action Reducer action
 * @param {object} action.payload Action payload (data)
 * @param {string} action.type Action type
 * @returns {TemplatesStore} New state
 */
const templatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
    case actionTypes.CREATE_TEMPLATE_SUCCESS:
    case actionTypes.UPDATE_TEMPLATE_SUCCESS:
    case actionTypes.DELETE_TEMPLATE_SUCCESS:
      return [...action.payload.templates];

    default:
      return state;
  }
};

export default templatesReducer;
