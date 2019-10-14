import _ from 'lodash';

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

export const findTarget = (columns, id) => {
  const target = _.find(columns, {
    uuid: id,
  });
  return target ? target.name : '';
};

export default getCurrentRoute;
