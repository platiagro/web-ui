import jupyterLabApi from 'services/JupyterLabApi';
import { AuthExpiredInterceptor } from 'services/interceptors';
import { AXIOS_INSTANCE_FACTORY_IDENTIFIER } from 'services/factories';

describe('JupyterLabApi', () => {
  it('should have the axios factory unique identifier', () => {
    expect(jupyterLabApi.axiosInstance.factoryIdentifier).toBe(
      AXIOS_INSTANCE_FACTORY_IDENTIFIER
    );
  });

  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(jupyterLabApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
