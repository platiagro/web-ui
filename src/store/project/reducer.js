// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: null,
  experiments: null,
  name: null,
  description: null,
  updatedAt: null,
  uuid: null,
};

/**
 * project reducer
 */
const project = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // project
    // fetch project success
    case actionTypes.FETCH_PROJECT_SUCCESS:
      return { ...action.project };
    // create project success
    case actionTypes.CREATE_PROJECT_SUCCESS:
      message.info(`Projeto ${action.project.name} criado!`);
      return { ...action.project };
    // delete project success
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return message.info(`Projeto excluído!`);
    // edit project name success
    case actionTypes.EDIT_PROJECT_NAME_SUCCESS:
      return { ...action.project };
    // // // // // // //

    // FAIL
    // project
    case actionTypes.FETCH_PROJECT_FAIL:
    case actionTypes.CREATE_PROJECT_FAIL:
    case actionTypes.DELETE_PROJECT_FAIL:
    case actionTypes.EDIT_PROJECT_NAME_FAIL:
    case actionTypes.EDIT_PROJECT_REQUEST:
      message.error(action.errorMessage, 5);
      return state;

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default project;
