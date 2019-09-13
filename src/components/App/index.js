import React from 'react';

import { Layout } from 'antd';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';
import MainFooter from '../MainFooter';
import MainDrawer from '../MainDrawer';

const App = () => (
  <Layout className='layout'>
    <MainDrawer />
    <MainHeader />
    <MainContent />
    <MainFooter />
  </Layout>
);

export default App;
