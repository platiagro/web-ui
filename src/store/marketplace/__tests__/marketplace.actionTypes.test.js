import * as MARKETPLACE_TYPES from '../marketplace.actionTypes';

describe('Marketplace Action Types', () => {
  it('should have the prefix @MARKETPLACE in every action type', () => {
    const allActionTypesHavePrefix = Object.values(MARKETPLACE_TYPES).every(
      (actionType) => {
        return actionType.includes('@MARKETPLACE');
      }
    );

    expect(allActionTypesHavePrefix).toBe(true);
  });
});
