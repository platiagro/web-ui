/* 
  Main component of the application.
  
  This component is responsible for structuring the main layout of the
  application.
  
  This component is also responsible for routing the main content of the
  application.
*/

import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { Layout } from 'antd';

import mainRoutes from '../../routes/main';

import MainHeader from '../MainHeader/_';
import MainFooter from '../MainFooter';

import Content from '../Content/_';

const { Header, Footer } = Layout;

const App = () => (
  <Layout>
    <MainHeader />
    <Content showHeader />
    <Footer>
      <MainFooter />
    </Footer>
  </Layout>
);

export default App;
