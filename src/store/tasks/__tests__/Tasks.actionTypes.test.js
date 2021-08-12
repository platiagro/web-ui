import * as TASKS_TYPES from '../tasks.actionTypes';

describe('Tasks Action Types', () => {
  it('should have the prefix @TASKS in every action type', () => {
    const allActionTypesHavePrefix = Object.values(TASKS_TYPES).every(
      (actionType) => {
        return actionType.includes('@TASKS');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
