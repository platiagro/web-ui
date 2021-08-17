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

  it('should change window.location when the error location exists', () => {
    const error = new Error('The request failed with error 302');
    error.response = { status: 302, data: { location: '/dex/auth' } };
    const returnData = AuthExpiredInterceptor.response.onRejected(error);
    expect(window.location.assign).toBeCalledWith(error.response.data.location);
    expect(returnData).toBe(undefined);
  });

  it('should return rejected promise if error location is not defined', async () => {
    const error = new Error('The request failed with error 404');
    error.response = { status: 404 };
    const rejectedPromise = AuthExpiredInterceptor.response.onRejected(error);
    expect(window.location.assign).not.toBeCalled();
    await expect(rejectedPromise).rejects.toEqual(error);
  });

  it('should return rejected promise if "error?.response?.data?.location" is undefined', async () => {
    const error1 = undefined;
    const rejectedPromise1 = AuthExpiredInterceptor.response.onRejected(error1);
    await expect(rejectedPromise1).rejects.toEqual(error1);

    const error2 = new Error('Without response');
    const rejectedPromise2 = AuthExpiredInterceptor.response.onRejected(error2);
    await expect(rejectedPromise2).rejects.toEqual(error2);

    const error3 = new Error('With response but without data');
    error3.response = {};
    const rejectedPromise3 = AuthExpiredInterceptor.response.onRejected(error3);
    await expect(rejectedPromise3).rejects.toEqual(error3);

    const error4 = new Error('With response and data but without location');
    error4.response = { data: {} };
    const rejectedPromise4 = AuthExpiredInterceptor.response.onRejected(error4);
    await expect(rejectedPromise4).rejects.toEqual(error4);

    expect(window.location.assign).not.toBeCalled();
  });
});
