import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import Header from './Header';
import Home from '../../routes/Home';
import Login from '../../routes/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Header>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Header>
      </div>
    </Router>
  );
}

export default App;
