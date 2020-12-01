// CORE LIBS
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// UI LIBS
import { Layout } from 'antd';

// STYLES
import './style.less';

import Routes from 'Routes';

/**
 * Content.
 * This component is responsible for displaying the content.
 */
const Content = () => {
  // RENDER
  return (
    // layout component
    <Layout>
      <Switch>
        {Routes.map((route) => {
          const { exact, path, strict } = route;

          return (
            <Route key={path} exact={exact} path={path} strict={strict}>
              <route.component />
            </Route>
          );
        })}
      </Switch>
    </Layout>
  );
};

// EXPORT
export default Content;
