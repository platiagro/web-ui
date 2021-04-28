import React from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Routes from 'routes';
import MainSider from 'components/MainSider/_';

import './style.less';

const App = () => (
  <Layout className='main-layout'>
    <MainSider />

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
  </Layout>
);

export default App;
