import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppDrawer } from './Drawer';

it('should render without crashing when is not logged in', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AppDrawer isLoggedIn={false} />
    </Router>,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});

it('should render without crashing when is logged in', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AppDrawer isLoggedIn={true} />
    </Router>,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});
