import operatorsApi from '../OperatorsApi';
import { AuthExpiredInterceptor } from '../interceptors';

describe('OperatorsApi', () => {
  it('should have the AuthExpired interceptor attached to the instance', () => {
    const interceptor = {
      fulfilled: undefined,
      rejected: AuthExpiredInterceptor.response.onRejected,
    };

    expect(operatorsApi.axiosInstance.interceptors.response.handlers).toEqual([
      interceptor,
    ]);
  });
});
