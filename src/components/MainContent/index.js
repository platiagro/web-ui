import React from 'react';

import { Switch, Route } from 'react-router-dom';

import './style.scss';

import { Layout } from 'antd';

import ContentHeader from '../ContentHeader';

import mainRoutes from '../../routes/main';

const { Content } = Layout;

const MainContent = () => (
  <div>
    <ContentHeader />
    <Content className='main-content'>
      <div className='content'>
        <Switch>
          {mainRoutes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </Content>
  </div>
);

export default MainContent;
