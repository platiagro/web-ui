import { getCurrentRoute, findTarget } from '../utils';
import mainRoutes from '../routes/main';

describe('Utils', () => {
  it('location without params', () => {
    const location = {
      pathname: '/components',
    };
    const currentRoute = getCurrentRoute(location, mainRoutes);
    expect(currentRoute.path).toBe('/components');
  });

  it('location with params', () => {
    const location = {
      pathname: '/components/uuid',
    };
    const currentRoute = getCurrentRoute(location, mainRoutes);
    expect(currentRoute.path).toBe('/components');
  });

  it('location not in mainRoutes', () => {
    const location = {
      pathname: '/teste',
    };
    const currentRoute = getCurrentRoute(location, mainRoutes);
    expect(currentRoute.path).toBe('*');
  });

  it('findTarget', () => {
    const columns = [
      { uuid: '1', name: '1name' },
      { uuid: '2', name: '2name' },
    ];
    const find = findTarget(columns, '1');
    expect(find).toBe('1name');
    const notFind = findTarget(columns, 'mainRoutes');
    expect(notFind).toBe('');
  });
});
