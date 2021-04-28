import React from 'react';
import { Provider } from 'react-redux';
import PT_BR from 'antd/es/locale/pt_BR';
import { Layout, ConfigProvider } from 'antd';

import Store from 'store';
import { MainRoutes } from 'routes';
import MainSider from 'components/MainSider/_';
import { CustomConfirmRouterContainer } from 'containers';

import './style.less';

const App = () => (
  <Provider store={Store}>
    <CustomConfirmRouterContainer>
      <ConfigProvider locale={PT_BR}>
        <Layout className='main-layout'>
          <MainSider />

          <Layout>
            <MainRoutes />
          </Layout>
        </Layout>
      </ConfigProvider>
    </CustomConfirmRouterContainer>
  </Provider>
);

export default App;
