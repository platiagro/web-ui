import tasksApi from '../TasksApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('TasksApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: undefined,
      rejected: AuthExpiredInterceptor.response.onRejected,
    };

    expect(tasksApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
