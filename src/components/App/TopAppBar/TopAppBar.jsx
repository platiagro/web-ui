import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TopAppBar, {
  TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle 
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import './TopAppBar.scss';
import { toggleDrawer, signOut } from '../../../redux/actions';

export class AppTopAppBar extends React.Component {
  handleToggleDrawer = () => {
    this.props.toggleDrawer();
  }
  handleSignOut = () => {
    this.props.signOut();
  }
  render() {
    const { isLoggedIn, drawerIsDismissible } = this.props;
    return (
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align="start">
            {isLoggedIn && drawerIsDismissible &&
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon="menu" onClick={this.handleToggleDrawer} />
            </TopAppBarIcon>}
            <TopAppBarTitle>PlatIAgro</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align="end" role="toolbar">
            {isLoggedIn ? (
              <button onClick={this.handleSignOut} className="btn-link" style={{paddingRight: '20px'}}>Sign out</button>
            ) : (
              <Link to="/login" style={{paddingRight: '20px'}}>Sign in</Link>
            )}
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    drawerIsDismissible: state.window.drawer.dismissible
  };
};

const mapDispatchToProps = {
  toggleDrawer,
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppTopAppBar);
