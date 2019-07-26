import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Drawer, { DrawerContent } from '@material/react-drawer';
import List, { ListItemGraphic, ListItemText } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
import './Drawer.scss';

export function AppDrawer(props) {
  const { isLoggedIn, dismissible, open } = props;
  return (
    <>
      {isLoggedIn &&
        <Drawer dismissible={dismissible} open={open}>
        <DrawerContent className="mdc-drawer__content--align-start">
          <List tag="nav" singleSelection selectedIndex={props.selectedIndex}>

            <NavLink exact to="/" className="mdc-list-item" activeClassName="mdc-list-item--activated">
              <ListItemGraphic graphic={<MaterialIcon icon="home" />} size="3x" />
              <ListItemText primaryText="Home" secondaryText="Discover all of our features" />
            </NavLink>

            <NavLink exact to="/experiments" className="mdc-list-item" activeClassName="mdc-list-item--activated">
              <ListItemGraphic graphic={<MaterialIcon icon="code" />} size="3x" />
              <ListItemText primaryText="Experiment" secondaryText="Develop and evaluate models" />
            </NavLink>

            <NavLink exact to="/deployments" className="mdc-list-item" activeClassName="mdc-list-item--activated">
              <ListItemGraphic graphic={<MaterialIcon icon="local_shipping" />} size="3x" />
              <ListItemText primaryText="Deploy" secondaryText="Put models into production" />
            </NavLink>

            <NavLink exact to="/monitor" className="mdc-list-item" activeClassName="mdc-list-item--activated">
              <ListItemGraphic graphic={<MaterialIcon icon="assessment" />} size="3x" />
              <ListItemText primaryText="Monitor" secondaryText="Track models' performance" />
            </NavLink>

          </List>
        </DrawerContent>

        <DrawerContent className="mdc-drawer__content--align-end">
          <List tag="nav">

            <NavLink exact to="/user/admin" className="mdc-list-item">
              <ListItemGraphic graphic={<MaterialIcon icon="person" />} size="3x" />
              <ListItemText primaryText="Admin" secondaryText="admin@platiagro.com" />
            </NavLink>

          </List>
        </DrawerContent>
      </Drawer>}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    dismissible: state.window.drawer.dismissible,
    open: state.window.drawer.open
  };
};

export default connect(
  mapStateToProps
)(AppDrawer);
