/* global TemplatesStore */
import * as TEMPLATES_TYPES from './templates.actionTypes';

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
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TEMPLATES_TYPES.FETCH_TEMPLATES_SUCCESS:
    case TEMPLATES_TYPES.CREATE_TEMPLATE_SUCCESS:
    case TEMPLATES_TYPES.UPDATE_TEMPLATE_SUCCESS:
      return [...action.payload.templates];

    // TODO: essa adaptação poderá ser removida quando a store de menu de tarefas for refatorada
    case TEMPLATES_TYPES.DELETE_TEMPLATE_SUCCESS:
      return [...action.payload.templates.templates];

    default:
      return state;
  }
};
