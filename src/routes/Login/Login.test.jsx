import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login';

it('renders without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <Login />,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});
