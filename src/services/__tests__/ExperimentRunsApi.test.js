import experimentRunsApi from '../ExperimentRunsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('ExperimentRunsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(
      experimentRunsApi.axiosInstance.interceptors.response.handlers
    ).toEqual([interceptor]);
  });
});
