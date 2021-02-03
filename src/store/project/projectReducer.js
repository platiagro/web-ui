// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  createdAt: null,
  experiments: null,
  name: '',
  description: null,
  updatedAt: null,
  uuid: null,
  loading: false,
};

/**
 * project reducer
 *
 * @param state
 * @param action
 * @param state
 * @param action
 */
const projectReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // project
    // fetch project success
    case actionTypes.FETCH_PROJECT_SUCCESS:
      return { ...action.project, ...action.payload };
    // create project success
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return { ...action.project };
    // delete project success
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return initialState;
    // edit project name success
    case actionTypes.EDIT_PROJECT_NAME_SUCCESS:
      return { ...action.project };
    // // // // // // //

    // FAIL
    // project
    case actionTypes.FETCH_PROJECT_FAIL:
      return { ...state, ...action.payload };
    case actionTypes.DELETE_PROJECT_FAIL:
    case actionTypes.EDIT_PROJECT_NAME_FAIL:
      return { ...state };

    case actionTypes.FETCH_PROJECT_REQUEST:
      return { ...state, ...action.payload };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default projectReducer;
