import compareResultsApi from '../CompareResultsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('CompareResultsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(
      compareResultsApi.axiosInstance.interceptors.response.handlers
    ).toEqual([interceptor]);
  });
});
