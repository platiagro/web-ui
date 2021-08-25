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

      // Make the request never ends. Never run the catch block around the request
      return new Promise(() => {});
    }

    return response;
  },

  onRejected(error) {
    const newLocation = error?.response?.data?.location;

    if (newLocation) {
      window.location.assign(newLocation);
      return;
    }

    return Promise.reject(error);
  },
};
