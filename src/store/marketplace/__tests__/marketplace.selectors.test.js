import {
  getMarketplaceTasks,
  getTotalMarketplaceTasks,
} from '../marketplace.selectors';

describe('Marketplace Selectors', () => {
  const marketplaceReducer = {
    totalMarketplaceTasks: 1,
    marketplaceTasks: [{ uuid: '1', name: 'Task Name' }],
  };

  it('should return the marketplace tasks array from the state', () => {
    expect(getMarketplaceTasks({ marketplaceReducer })).toEqual(
      marketplaceReducer.marketplaceTasks
    );
  });

  it('should return the total of marketplace tasks from the state', () => {
    expect(getTotalMarketplaceTasks({ marketplaceReducer })).toBe(
      marketplaceReducer.totalMarketplaceTasks
    );
  });
});
