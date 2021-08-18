export const Response = {
  onFulfilled(response) {
    console.log(response);
    return response;
  },

  onRejected(error) {
    console.log(error, error?.response);
    const newLocation = error?.response?.data?.location;

    if (newLocation) {
      // Redirect to the base route. This will show the login page to the user
      // window.location.assign saves the new route in the browser history
      window.location.assign(newLocation);
      return;
    }

    return Promise.reject(error);
  },
};
