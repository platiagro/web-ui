/* istanbul ignore file */
// STYLES (in this file styles need to be loading before all code)
import './style.scss';
import 'antd/dist/antd.css';

// CORE LIBS
import React from 'react';
import ReactDOM from 'react-dom';

// COMPONENTS
import App from './components/App';

// SERVICE WORKER
import * as serviceWorker from './serviceWorker';

// initializing react app
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
