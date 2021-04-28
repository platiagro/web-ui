import { ADD_LOADING, REMOVE_LOADING } from './loading.actionTypes';

const initialState = {
  loading: {},
};

export const loadingReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_LOADING: {
      return {
        ...state,
        loading: {
          ...state.loading,
          ...payload,
        },
      };
    }

    case REMOVE_LOADING: {
      const newLoading = { ...state.loading };

      payload.forEach((key) => {
        delete newLoading[key];
      });

      return {
        ...state,
        loading: newLoading,
      };
    }

    default:
      return state;
  }
};
