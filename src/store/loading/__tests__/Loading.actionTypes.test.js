import * as LOADING_TYPES from '../loading.actionTypes';

describe('Loading Action Types', () => {
  it('should have the prefix @LOADING in every action type', () => {
    const allActionTypesHavePrefix = Object.values(LOADING_TYPES).every(
      (actionType) => {
        return actionType.includes('@LOADING');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
