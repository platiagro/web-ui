import deploymentRunsApi from '../DeploymentRunsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('DeploymentRunsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: AuthExpiredInterceptor.Response.onFulfilled,
      rejected: AuthExpiredInterceptor.Response.onRejected,
    };

    expect(
      deploymentRunsApi.axiosInstance.interceptors.response.handlers
    ).toEqual([interceptor]);
  });
});
