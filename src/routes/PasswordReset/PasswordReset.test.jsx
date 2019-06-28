import React from 'react';
import ReactDOM from 'react-dom';
import PasswordReset from './PasswordReset';

it('renders without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(
    <PasswordReset />,
    container
  );
  ReactDOM.unmountComponentAtNode(container);
});
