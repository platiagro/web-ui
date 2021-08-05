import { ADD_LOADING, REMOVE_LOADING } from '../loading.actionTypes';
import { addLoading, removeLoading } from '../loading.actions';

describe('Loading Actions', () => {
  it('should create an action to add loading with some keys', () => {
    const action = addLoading('KEY_1', 'KEY_2', 'KEY_3');
    expect(action).toEqual({
      type: ADD_LOADING,
      payload: {
        KEY_1: true,
        KEY_2: true,
        KEY_3: true,
      },
    });
  });

  it('should create an action to remove loading with some keys', () => {
    const action = removeLoading('KEY_1', 'KEY_2', 'KEY_3');
    expect(action).toEqual({
      type: REMOVE_LOADING,
      payload: ['KEY_1', 'KEY_2', 'KEY_3'],
    });
  });
});
