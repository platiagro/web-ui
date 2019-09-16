import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import './style.scss';

import { Layout } from 'antd';

import ContentHeader from '../ContentHeader';

import Projects from '../../pages/Projects';
import E404 from '../../pages/E404';

const { Content } = Layout;

const MainContent = () => (
  <div>
    <ContentHeader />
    <Content className='main-content'>
      <div className='content'>
        <Switch>
          <Redirect exact from='/' to='/projects' />
          <Route path='/projects' component={Projects} />
          <Route component={E404} />
        </Switch>
      </div>
    </Content>
  </div>
);

export default MainContent;
