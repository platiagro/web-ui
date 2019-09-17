import React from 'react';

import PropTypes from 'prop-types';

import { Layout } from 'antd';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';
import MainFooter from '../MainFooter';
import MainDrawer from '../MainDrawer';

import mainRoutes from '../../routes/main';

/* 
  This component is responsible for control the app logic and render the others
  components of app.
  
  This receive a location object with pathname key in props.
  Location props is required with the same format (contain pathname key).
*/
const App = ({ location }) => {
  // search for current path in mainRoutes
  let currentRoute = mainRoutes.find((route) => {
    return route.path === location.pathname;
  });

  // current path not in mainRoutes
  if (!currentRoute)
    currentRoute = mainRoutes.find((route) => {
      return route.path === '*';
    });

  return (
    <Layout className='layout'>
      <MainDrawer />
      <MainHeader selectedKeys={[currentRoute.path]} mainRoutes={mainRoutes} />
      <MainContent
        title={currentRoute.title}
        subTitle={currentRoute.subTitle}
        mainRoutes={mainRoutes}
      />
      <MainFooter />
    </Layout>
  );
};

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default App;
