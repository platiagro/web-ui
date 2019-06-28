import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedAppTopAppBar, { AppTopAppBar } from './TopAppBar';
import rootReducer from '../../../redux/reducers';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing when drawer is not dismissible', () => {
  ReactDOM.render(
    <Router>
      <AppTopAppBar isLoggedIn={true} drawerIsDismissible={false} />
    </Router>,
    container
  );
});

it('renders without crashing when drawer is dismissible', () => {
  ReactDOM.render(
    <Router>
      <AppTopAppBar isLoggedIn={true} drawerIsDismissible={true} />
    </Router>,
    container
  );
});

it('renders without crashing when nav icon is clicked', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: true}, window: {drawer: {dismissible: true, open: false}}});
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConnectedAppTopAppBar />
      </Router>
    </Provider>,
    container
  );

  const navIcon = container.querySelector('.mdc-top-app-bar__navigation-icon');
  act(() => {
    navIcon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
});

it('renders without crashing when sign out is clicked', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: true}});
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConnectedAppTopAppBar />
      </Router>
    </Provider>,
    container
  );

  const signOutButton = container.querySelector('button');
  act(() => {
    signOutButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  const button = container.querySelector('button');
  expect(button).toBe(null);
});
