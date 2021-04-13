// ACTION TYPES
import { actionTypes } from 'store/Projects/Actions';

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
 */
const projectReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // project
    // create project success
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return { ...action.project };

    // FAIL
    // project
    case actionTypes.FETCH_PROJECT_FAIL:
      return { ...state, ...action.payload };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default projectReducer;
