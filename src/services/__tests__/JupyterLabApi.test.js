import jupyterLabApi from '../JupyterLabApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('JupyterLabApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: undefined,
      rejected: AuthExpiredInterceptor.response.onRejected,
    };

    expect(jupyterLabApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
