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

import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import MainDrawer from '../MainDrawer';
import AttributeFilterDrawerContent from '../AttributeFilterDrawerContent';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout>
    <MainDrawer title='Filtro de atributos'>
      <AttributeFilterDrawerContent />
    </MainDrawer>
    <Layout>
      <Header>
        <Route
          // eslint-disable-next-line
          render={(props) => <MainHeader {...props} mainRoutes={mainRoutes} />}
        />
      </Header>
      <Content>
        <Switch>
          {mainRoutes.map((mainRoute) => (
            <Route
              key={mainRoute.path}
              exact={mainRoute.exact}
              path={mainRoute.path}
              component={mainRoute.component}
            />
          ))}
        </Switch>
      </Content>
      <Footer>
        <MainFooter />
      </Footer>
    </Layout>
  </Layout>
);

export default App;
