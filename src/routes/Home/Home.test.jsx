import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedHome, { Home } from './Home';
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
    <Home isLoggedIn={true} />,
    container
  );
});

it('renders without crashing when connected', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: true}});
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConnectedHome />
      </Router>
    /</Provider>,
    container
  );
});
