// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from './index';

// ACTIONS
import { hideInferenceLogsDrawer } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleHideDrawer: () => dispatch(hideInferenceLogsDrawer()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    drawer: state.uiReducer.inferenceLogsDrawer,
    logs: state.deploymentLogsReducer.logs,
  };
};

/**
 * Drawer Logs Container.
 * This component is responsible for create a logic container for drawer log with
 * redux.
 */
const DrawerContainer = ({ drawer, handleHideDrawer, logs }) => {
  return (
    <Drawer
      handleClose={handleHideDrawer}
      isLoading={drawer.loading}
      isVisible={drawer.visible}
      logs={logs}
      title={drawer.title}
    />
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
