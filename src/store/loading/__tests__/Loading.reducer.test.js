import { ADD_LOADING, REMOVE_LOADING } from '../loading.actionTypes';
import { loadingReducer, initialState } from '../loading.reducer';

describe('Loading Reducer', () => {
  const currentState = {
    ...initialState,
    loading: {
      KEY_1: true,
      KEY_2: true,
    },
  };

  it('should add loading to an empty reducer state', () => {
    const action = {
      type: ADD_LOADING,
      payload: {
        KEY_1: true,
        KEY_2: true,
      },
    };

    const newState = loadingReducer(initialState, action);

    expect(newState).toEqual({
      loading: action.payload,
    });
  });

  it('should add loading and do not override existing keys in the state', () => {
    const action = {
      type: ADD_LOADING,
      payload: {
        KEY_3: true,
        KEY_4: true,
      },
    };

    const newState = loadingReducer(currentState, action);

    expect(newState).toEqual({
      loading: { ...currentState.loading, ...action.payload },
    });
  });

  it('should remove loading from the reducer state', () => {
    const action = {
      type: REMOVE_LOADING,
      payload: ['KEY_2'],
    };

    const newState = loadingReducer(currentState, action);

    expect(newState).toEqual({
      loading: {
        KEY_1: true,
      },
    });
  });

  it('should remove multiple loadings from the reducer state', () => {
    const action = {
      type: REMOVE_LOADING,
      payload: ['KEY_1', 'KEY_2'],
    };

    const newState = loadingReducer(currentState, action);
    expect(newState).toEqual(initialState);
  });
});
