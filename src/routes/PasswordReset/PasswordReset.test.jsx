import React from 'react';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'jest-dom/extend-expect';
import ConnectedPasswordReset, { PasswordReset } from './PasswordReset';
import rootReducer from '../../redux/reducers';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  ReactDOM.render(
    <PasswordReset />,
    container
  );
});

it('renders without crashing when an username is typed', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedPasswordReset />
      </Provider>,
      container
    );
  });

  const emailInput = container.querySelector('input#email');
  act(() => {
    Simulate.change(emailInput, {target: {value: 'nobody@email.com'}});
  });
});

it('renders without crashing when send password reset email button is clicked', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedPasswordReset />
      </Provider>,
      container
    );
  });

  const resetButton = container.querySelector('.mdc-button');
  act(() => {
    resetButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
});
