import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'jest-dom/extend-expect';
import App from '../App';
import rootReducer from '../../redux/reducers';

const resizeWindow = (x, y) => {
  act(() => {
    global.innerWidth = x;
    global.innerHeight = y;
    global.dispatchEvent(new Event('resize'));
  });
}

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
});

// it('renders permanent drawer when width is greater that 920px', () => {
//   const store = createStore(rootReducer, {auth: {isLoggedIn: true}, window: {drawer: {dismissible: true, open: false}}});
//   act(() => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//       container
//     );
//   });

//   resizeWindow(1024, 768);

//   // BUG: resize does not cause any changes to DOM
//   // at the moment, the asserts below will fail
//   const drawer = container.querySelector('.mdc-drawer');
//   expect(drawer).toBeVisible();

//   const navIcon = container.querySelector('.mdc-top-app-bar__navigation-icon');
//   expect(navIcon).not.toBeVisible();
// });

// it('renders dismissible drawer when width is less than or equal to 920px', () => {
//   const store = createStore(rootReducer, {auth: {isLoggedIn: true}, window: {drawer: {dismissible: false, open: true}}});
//   act(() => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//       container
//     );
//   });

//   resizeWindow(768, 1024);

//   // BUG: resize does not cause any changes to DOM
//   // at the moment, the asserts below will fail
//   const drawer = container.querySelector('.mdc-drawer');
//   expect(drawer).not.toBeVisible();

//   const navIcon = container.querySelector('.mdc-top-app-bar__navigation-icon');
//   expect(navIcon).toBeVisible();
// });

// it('hides drawer when drawer is open and app content is clicked', () => {
//   const store = createStore(rootReducer, {auth: {isLoggedIn: true}, window: {drawer: {dismissible: true, open: true}}});
//   act(() => {
//     ReactDOM.render(
//       <Provider store={store}>
//         <App />
//       </Provider>,
//       container
//     );
//   });

//   const appContent = container.querySelector('.drawer-app-content');
//   act(() => {
//     appContent.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });

//   // BUG: click does not cause any changes to DOM
//   // at the moment, the assert below will fail
//   const drawer = container.querySelector('.mdc-drawer');
//   expect(drawer).not.toBeVisible();
// });
