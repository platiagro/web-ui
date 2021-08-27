import { message } from 'antd';

export const Response = {
  onFulfilled(response) {
    const contentType = response?.headers?.['content-type'] || '';
    const isContentTypeHTML = contentType.includes('text/html');

    const responseURL = response?.request?.responseURL || '';
    const isResponseURLTheDexAuth = responseURL.includes('/dex/auth');

    if (isContentTypeHTML && isResponseURLTheDexAuth) {
      message.loading({
        key: 'RedirectingToLogin',
        content: 'Redirecionando para o Login...',
      });

      window.location.assign('/');

      // About the return statement below:
      // Makes the request never ends, so the catch block around the request is never executed, preventing error alerts to pop up on the screen
      return new Promise(() => null);
    }

    return response;
  },

  onRejected(error) {
    const newLocation = error?.response?.data?.location;

    if (newLocation) {
      message.loading({
        key: 'RedirectingToLocation',
        content: 'Redirecionando...',
      });

      window.location.assign(newLocation);
      return;
    }

    return Promise.reject(error);
  },
};
