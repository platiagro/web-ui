import experimentsApi from '../ExperimentsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('ExperimentsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(experimentsApi.axiosInstance.interceptors.response.handlers).toEqual(
      [interceptor]
    );
  });
});
