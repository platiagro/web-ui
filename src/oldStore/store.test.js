import store from './store';

describe('Store should', () => {
  it('is expected to create without crashing', () => {
    expect(!!store).toBeTruthy();
  });
});
