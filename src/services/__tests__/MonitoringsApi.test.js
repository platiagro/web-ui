import monitoringsApi from '../MonitoringsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('MonitoringsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(monitoringsApi.axiosInstance.interceptors.response.handlers).toEqual(
      [interceptor]
    );
  });
});
