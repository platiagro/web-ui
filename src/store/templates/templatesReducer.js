import actionTypes from './actionTypes';

const initialState = [];

const templatesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return [...action.templates];

    case actionTypes.CREATE_TEMPLATE_SUCCESS:
      return [...state, action.template];

    case actionTypes.UPDATE_TEMPLATE_SUCCESS:
      return [...action.templates];

    case actionTypes.DELETE_TEMPLATE_SUCCESS:
      return [...action.templates];

    default:
      return state;
  }
};

export default templatesReducer;
