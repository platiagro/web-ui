import './style.less'; // * This file must be first one

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';

import App from './pages/App';

import { CustomConfirmRouterContainer as Router } from './containers';

import store from './store';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('@axe-core/react');
  // * Empty configuration to fix "runOnly" bug
  axe(React, ReactDOM, 1000, {});
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={ptBR}>
        <App />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
