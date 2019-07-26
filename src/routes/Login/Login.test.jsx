import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, Simulate } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'jest-dom/extend-expect';
import ConnectedLogin, { Login } from './Login';
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
    <Router>
      <Login />
    </Router>,
    container
  );
});

it('renders without crashing when an username is typed', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <ConnectedLogin />
        </Router>
      </Provider>,
      container
    );
  });

  const usernameInput = container.querySelector('input#username');
  act(() => {
    Simulate.change(usernameInput, {target: {value: 'admin'}});
  });
});

it('renders without crashing when an password is typed', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <ConnectedLogin />
        </Router>
      </Provider>,
      container
    );
  });

  const passwordInput = container.querySelector('input#password');
  act(() => {
    Simulate.change(passwordInput, {target: {value: 'admin'}});
  });
});

it('renders without crashing when sign in button is clicked', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <ConnectedLogin />
        </Router>
      </Provider>,
      container
    );
  });

  const signInButton = container.querySelector('.mdc-button');
  act(() => {
    signInButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
});
