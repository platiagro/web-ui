import deploymentsOperatorsApi from '../DeploymentsOperatorsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('DeploymentsOperatorsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: undefined,
      rejected: AuthExpiredInterceptor.response.onRejected,
    };

    expect(
      deploymentsOperatorsApi.axiosInstance.interceptors.response.handlers
    ).toEqual([interceptor]);
  });
});
