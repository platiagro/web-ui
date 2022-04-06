import DEPLOYMENT_LOGS_TYPES from '../actionTypes';

describe('Deployment Logs Action Types', () => {
  it('should have the prefix @DEPLOYMENT_LOGS in every action type', () => {
    const allActionTypesHavePrefix = Object.values(DEPLOYMENT_LOGS_TYPES).every(
      (actionType) => {
        return actionType.includes('@DEPLOYMENT_LOGS');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
