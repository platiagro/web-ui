import * as TASKS_TYPES from '../operator.actionTypes';

describe('Operator Action Types', () => {
  it('should have the prefix @OPERATOR in every action type', () => {
    const allActionTypesHavePrefix = Object.values(TASKS_TYPES).every(
      (actionType) => {
        return actionType.includes('@OPERATOR');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
