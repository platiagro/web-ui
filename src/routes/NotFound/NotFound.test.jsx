import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
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
});

it('renders without crashing when connected', () => {
  const store = createStore(rootReducer, {auth: {isLoggedIn: true}});
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConnectedNotFound />
      </Router>
    </Provider>,
    container
  );
});
