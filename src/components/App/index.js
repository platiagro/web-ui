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

import EditableTitle from '../EditableTitle';

const { Header, Footer } = Layout;

const editableTitleClassName =
  'ant-page-header-heading-title autosize-input-custom';

const App = () => (
  <Layout>
    <MainHeader />
    <Layout>
      {/* <Switch>
          {mainRoutes.map((mainRoute) => (
            <Route
              key={mainRoute.path}
              exact={mainRoute.exact}
              path={mainRoute.path}
              component={mainRoute.component}
            />
          ))}
        </Switch> */}
      <EditableTitle
        loading={false}
        title='Titulo'
        handleSubmit={(title) => alert(title)}
        className={editableTitleClassName}
        editingClassName={`${editableTitleClassName} edit-mode`}
      />
    </Layout>
    <Footer>
      <MainFooter />
    </Footer>
  </Layout>
);

export default App;
