import deploymentsApi from '../DeploymentsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('DeploymentsApi', () => {
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
