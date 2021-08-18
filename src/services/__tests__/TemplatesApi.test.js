import templatesApi from '../TemplatesApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('TemplatesApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(templatesApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
