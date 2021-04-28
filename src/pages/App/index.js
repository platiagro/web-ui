import React from 'react';
import { Layout } from 'antd';

import { MainRoutes } from 'routes';
import MainSider from 'components/MainSider/_';

import './style.less';

const App = () => (
  <Layout className='main-layout'>
    <MainSider />

    <Layout>
      <MainRoutes />
    </Layout>
  </Layout>
);

export default App;
