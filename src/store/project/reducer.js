// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: null,
  experiments: null,
  name: null,
  updatedAt: null,
  uuid: null,
};

/**
 * project reducer
 */
const project = (state = initialState, action) => {
  switch (action.type) {
    // fetch project success
    case actionTypes.FETCH_PROJECT_SUCCESS:
      return action.project;
    // fetch project fail
    case actionTypes.FETCH_PROJECT_FAIL:
      return message.error(action.errorMessage);
    // create project success
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return message.info(`Projeto ${action.project.name} criado!`);
    // create project fail
    case actionTypes.CREATE_PROJECT_FAIL:
      return message.error(action.errorMessage);
    // delete project success
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return message.info(`Projeto excluído!`);
    // delete project fail
    case actionTypes.DELETE_PROJECT_FAIL:
      return message.error(action.errorMessage);
    // edit project name success
    case actionTypes.EDIT_PROJECT_NAME_SUCCESS:
      return action.project;
    // edit project name fail
    case actionTypes.EDIT_PROJECT_NAME_FAIL:
      return message.error(action.errorMessage);
    default:
      return state;
  }
};

// EXPORT
export default project;
