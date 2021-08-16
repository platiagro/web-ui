export const response = {
  onRejected(error) {
    // The HyperText Transfer Protocol (HTTP) 302 Found redirect status response code indicates that the resource requested has been temporarily moved to the URL given by the Location header. Learn More At https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302
    if (error?.response?.status === 302) {
      // Redirect to the base route. This will show the login page to the user
      // window.location.assign saves the new route in the browser history
      window.location.assign('/');
      return;
    }

    return Promise.reject(error);
  },
};
