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

  it('should return the response object without modifications', () => {
    const response = { config: {}, data: [] };
    const newResponse = AuthExpiredInterceptor.Response.onFulfilled(response);
    expect(newResponse).toBe(response);
    expect(window.location.assign).not.toBeCalled();
  });

  it('should change window.location when response header content-type is text/html', () => {
    const response = { headers: { 'content-type': 'text/html' } };
    AuthExpiredInterceptor.Response.onFulfilled(response);
    expect(window.location.assign).toBeCalledWith('/');
  });

  it('should change window.location when the response contains a responseURL attr that includes /dex/auth', () => {
    const response = { request: { responseURL: 'http://.../dex/auth/local' } };
    AuthExpiredInterceptor.Response.onFulfilled(response);
    expect(window.location.assign).toBeCalledWith(response.request.responseURL);
  });

  it('should change window.location when the error location exists', () => {
    const error = new Error('The request failed with error 302');
    error.response = { status: 302, data: { location: '/dex/auth' } };
    const returnData = AuthExpiredInterceptor.Response.onRejected(error);
    expect(window.location.assign).toBeCalledWith(error.response.data.location);
    expect(returnData).toBe(undefined);
  });

  it('should return rejected promise if error location is not defined', async () => {
    const error = new Error('The request failed with error 404');
    error.response = { status: 404 };
    const rejectedPromise = AuthExpiredInterceptor.Response.onRejected(error);
    expect(window.location.assign).not.toBeCalled();
    await expect(rejectedPromise).rejects.toEqual(error);
  });

  it('should return rejected promise if "error?.response?.data?.location" is undefined', async () => {
    const error1 = undefined;
    const rejectedPromise1 = AuthExpiredInterceptor.Response.onRejected(error1);
    await expect(rejectedPromise1).rejects.toEqual(error1);

    const error2 = new Error('Without response');
    const rejectedPromise2 = AuthExpiredInterceptor.Response.onRejected(error2);
    await expect(rejectedPromise2).rejects.toEqual(error2);

    const error3 = new Error('With response but without data');
    error3.response = {};
    const rejectedPromise3 = AuthExpiredInterceptor.Response.onRejected(error3);
    await expect(rejectedPromise3).rejects.toEqual(error3);

    const error4 = new Error('With response and data but without location');
    error4.response = { data: {} };
    const rejectedPromise4 = AuthExpiredInterceptor.Response.onRejected(error4);
    await expect(rejectedPromise4).rejects.toEqual(error4);

    expect(window.location.assign).not.toBeCalled();
  });
});
