import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App from '../App';
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
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    container
  );

  const button = container.querySelector('input');
  expect(button.value).toBe('Sign In');
});

it('renders without crashing and signs in', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: false}});
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  const signInButton = container.querySelector('input');
  act(() => {
    signInButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const signOutButton = container.querySelector('input');
  expect(signOutButton.value).toBe('Sign out');
});
