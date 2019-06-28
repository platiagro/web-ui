import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './Header';

it('renders without crashing when is not logged in', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AppHeader isLoggedIn={false} />
    </Router>,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});

it('renders without crashing when is logged in', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AppHeader isLoggedIn={true} />
    </Router>,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});
