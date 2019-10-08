const getCurrentRoute = (location, mainRoutes) => {
  const pathWithoutParams = `/${location.pathname.split('/')[1]}`;

  // search for current path in mainRoutes
  let currentRoute = mainRoutes.find((route) => {
    return route.path === location.pathname;
  });

  // current path has parameter
  if (!currentRoute)
    currentRoute = mainRoutes.find((route) => {
      return route.path === pathWithoutParams;
    });

  // current path not in mainRoutes
  if (!currentRoute)
    currentRoute = mainRoutes.find((route) => {
      return route.path === '*';
    });

  return currentRoute;
};

export default getCurrentRoute;
