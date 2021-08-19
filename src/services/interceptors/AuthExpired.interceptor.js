export const Response = {
  onFulfilled(response) {
    const contentType = response?.headers?.['content-type'] || '';
    const isContentTypeHTML = contentType.includes('text/html');

    const responseURL = response?.request?.responseURL || '';
    const isResponseURLTheDexAuth = responseURL.includes('/dex/auth');

    if (isContentTypeHTML && isResponseURLTheDexAuth) {
      window.location.assign('/');
      return Promise.reject(new Error('Redirecionando para o login...'));
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
