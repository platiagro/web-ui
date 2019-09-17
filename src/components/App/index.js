import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'antd';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';
import MainFooter from '../MainFooter';
import MainDrawer from '../MainDrawer';

const App = () => (
  <Router>
    <Layout className='layout'>
      <MainDrawer />
      <Route component={MainHeader} />
      <MainContent />
      <MainFooter />
    </Layout>
  </Router>
);

export default App;
