import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './Header';
import Home from '../../routes/Home';
import Login from '../../routes/Login';
import NotFound from '../../routes/NotFound';
import PasswordReset from '../../routes/PasswordReset';

export function App(props) {
  return (
    <Router>
      <div className="App">
        <Header>
          {props.isLoggedIn ? (
            <UserRoutes />
          ) : (
            <GuestRoutes />
          )}
        </Header>
      </div>
    </Router>
  );
}

function GuestRoutes() {
  return (
    <Switch>
      <Route path="/password_reset" exact component={PasswordReset} />
      <Route path="" component={Login} />
    </Switch>
  );
}

function UserRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="" component={NotFound} />
    </Switch>
  );
}

const mapStateToProps = state => {
  return { isLoggedIn: state.login.isLoggedIn };
};

export default connect(
  mapStateToProps
)(App);
