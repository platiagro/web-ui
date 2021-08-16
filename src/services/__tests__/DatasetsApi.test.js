import datasetsApi from '../DatasetsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('DatasetsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: undefined,
      rejected: AuthExpiredInterceptor.response.onRejected,
    };

    expect(datasetsApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
