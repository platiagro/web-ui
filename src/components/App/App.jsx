import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';
import { DrawerAppContent } from '@material/react-drawer';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import './App.scss';
import Drawer from './Drawer';
import TopAppBar from './TopAppBar';
import Home from '../../routes/Home';
import Login from '../../routes/Login';
import NotFound from '../../routes/NotFound';
import PasswordReset from '../../routes/PasswordReset';
import { adaptLayout, toggleDrawer } from '../../redux/actions';

class App extends React.Component {
  handleAdaptLayout = (width) => {
    console.log('handleAdaptLayout');
    this.props.adaptLayout(width);
  }
  handleToggleDrawer = () => {
    this.props.toggleDrawer();
  }
  render() {
    const { isLoggedIn, drawerIsOpen } = this.props;
    const appContentProps = {};
    if (drawerIsOpen) {
      appContentProps.onClick = this.handleToggleDrawer;
    }
    return (
      <Router>
        <ReactResizeDetector handleWidth onResize={this.handleAdaptLayout} />
        <div className="drawer-container">
          <TopAppBar />

          <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
            <Drawer />

            <DrawerAppContent className="drawer-app-content" {...appContentProps}>
              {isLoggedIn ? (
                <UserRoutes />
              ) : (
                <GuestRoutes />
              )}
            </DrawerAppContent>
          </TopAppBarFixedAdjust>
        </div>
      </Router>
    );
  }
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
  return {
    isLoggedIn: state.auth.isLoggedIn,
    drawerIsOpen: state.window.drawer.open
  };
};

const mapDispatchToProps = {
  adaptLayout,
  toggleDrawer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
