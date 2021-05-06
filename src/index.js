import './style.less'; // * This file must be first one

import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';

if (process.env.NODE_ENV !== 'production') {
  var axe = require('@axe-core/react');
  // * Empty configuration to fix "runOnly" bug
  axe(React, ReactDOM, 1000, {});
}

ReactDOM.render(<App />, document.getElementById('root'));
