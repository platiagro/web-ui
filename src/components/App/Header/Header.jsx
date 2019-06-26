import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/images/logo.svg';

function AppHeader(props) {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {props.children}
        <Link to="/" className="App-link">Home</Link>
        <Link to="/login" className="App-link">Login</Link>
      </header>
    );
}

export default AppHeader;
