import UserNameApi from 'services/MonitoringsApi';
import { AuthExpiredInterceptor } from 'services/interceptors';
import { AXIOS_INSTANCE_FACTORY_IDENTIFIER } from 'services/factories';

describe('MonitoringsApi', () => {
  it('should have the axios factory unique identifier', () => {
    expect(UserNameApi.axiosInstance.factoryIdentifier).toBe(
      AXIOS_INSTANCE_FACTORY_IDENTIFIER
    );
  });

  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(UserNameApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
