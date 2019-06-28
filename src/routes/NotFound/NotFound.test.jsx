import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ConnectedNotFound, { NotFound } from './NotFound';
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
    <NotFound isLoggedIn={true} />,
    container
  );

  const button = container.querySelector('input');
  expect(button.value).toBe('Sign out');
});

it('renders without crashing and signs out', () => {
  const store = createStore(rootReducer, {login: {isLoggedIn: true}});
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedNotFound />
    </Provider>,
    container
  );

  const signOutButton = container.querySelector('input');
  act(() => {
    signOutButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const button = container.querySelector('input');
  expect(button).toBe(null);
});
