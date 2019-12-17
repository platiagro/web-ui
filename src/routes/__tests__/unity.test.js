import mainRoutes from '../main';

describe('Main Routes', () => {
  it('match Snapshot', () => {
    expect(mainRoutes).toMatchSnapshot();
  });
});
