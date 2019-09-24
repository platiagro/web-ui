const getCurrentRoute = (location, mainRoutes) => {
  // search for current path in mainRoutes
  let currentRoute = mainRoutes.find((route) => {
    return route.path === location.pathname;
  });

  // current path not in mainRoutes
  if (!currentRoute)
    currentRoute = mainRoutes.find((route) => {
      return route.path === '*';
    });

  return currentRoute;
};

export default getCurrentRoute;
