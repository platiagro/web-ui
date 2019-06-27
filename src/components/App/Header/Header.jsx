import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/images/logo.svg';

function AppHeader(props) {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {props.children}
        {props.isLoggedIn ? (
          <p>
            <Link to="/" className="App-link">Home</Link>
          </p>
        ) : (
          <div>
            <p>
              <Link to="/login" className="App-link">Login</Link>
            </p>
            <p>
              <Link to="/password_reset" className="App-link">Forgot Password?</Link>
              </p>
          </div>
        )}
      </header>
    );
}

const mapStateToProps = state => {
  return { isLoggedIn: state.login.isLoggedIn };
};

export default connect(
  mapStateToProps
)(AppHeader);
