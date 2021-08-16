import * as AuthExpiredInterceptor from './AuthExpired.interceptor';

describe('AuthExpired interceptor', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('should change window.location when response status is 302', () => {
    const error = new Error('The request failed with error 302');
    error.response = { status: 302 };
    const returnData = AuthExpiredInterceptor.response.onRejected(error);
    expect(window.location.assign).toBeCalledWith('/');
    expect(returnData).toBe(undefined);
  });

  it('should return rejected promise if response status is not 302', async () => {
    const error = new Error('The request failed with error 404');
    error.response = { status: 404 };
    const rejectedPromise = AuthExpiredInterceptor.response.onRejected(error);
    expect(window.location.assign).not.toBeCalled();
    await expect(rejectedPromise).rejects.toEqual(error);
  });

  it('should return rejected promise if the expression "error?.response?.status" returns undefined', async () => {
    const error1 = undefined;
    const rejectedPromise1 = AuthExpiredInterceptor.response.onRejected(error1);
    await expect(rejectedPromise1).rejects.toEqual(error1);

    const error2 = new Error('An error without response');
    const rejectedPromise2 = AuthExpiredInterceptor.response.onRejected(error2);
    await expect(rejectedPromise2).rejects.toEqual(error2);

    const error3 = new Error('An error with response but without status');
    error3.response = {};
    const rejectedPromise3 = AuthExpiredInterceptor.response.onRejected(error3);
    await expect(rejectedPromise3).rejects.toEqual(error3);

    expect(window.location.assign).not.toBeCalled();
  });
});
