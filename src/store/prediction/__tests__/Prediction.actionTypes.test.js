import * as PREDICTION_TYPES from '../prediction.actionTypes';

describe('Prediction Action Types', () => {
  it('should have the prefix @PREDICTION in every action type', () => {
    const allActionTypesHavePrefix = Object.values(PREDICTION_TYPES).every(
      (actionType) => {
        return actionType.includes('@PREDICTION');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
