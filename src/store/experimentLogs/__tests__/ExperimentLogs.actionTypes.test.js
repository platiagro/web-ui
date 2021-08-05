import EXPERIMENT_LOGS_TYPES from '../actionTypes';

describe('Experiment Logs Action Types', () => {
  it('should have the prefix @EXPERIMENT_LOGS in every action type', () => {
    const allActionTypesHavePrefix = Object.values(EXPERIMENT_LOGS_TYPES).every(
      (actionType) => {
        return actionType.includes('@EXPERIMENT_LOGS');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
