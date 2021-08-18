import deploymentsApi from 'services/DeploymentsApi';
import { AuthExpiredInterceptor } from 'services/interceptors';
import { AXIOS_INSTANCE_FACTORY_IDENTIFIER } from 'services/factories';

describe('DeploymentsApi', () => {
  it('should have the axios factory unique identifier', () => {
    expect(deploymentsApi.axiosInstance.factoryIdentifier).toBe(
      AXIOS_INSTANCE_FACTORY_IDENTIFIER
    );
  });

  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(deploymentsApi.axiosInstance.interceptors.response.handlers).toEqual(
      [interceptor]
    );
  });
});
