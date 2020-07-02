// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from './index';

// ACTIONS
import { hideDrawer } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // hide drawer action
    handleHideDrawer: () => dispatch(hideDrawer()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    drawer: state.uiReducer.drawer,
    results: state.operatorReducer.results,
    resultsLoading: state.uiReducer.operatorResults.loading,
    logs: state.deploymentLogsReducer.logs,
  };
};

/**
 * Drawer Logs Container.
 * This component is responsible for create a logic container for drawer log with
 * redux.
 */
const DrawerContainer = ({
  drawer,
  handleHideDrawer,
  results,
  resultsLoading,
  logs,
}) => {
  // RENDER
  return (
    <Drawer
      isVisible={drawer.visible}
      isDataset={drawer.isDataset}
      handleClose={handleHideDrawer}
      results={results}
      resultsLoading={resultsLoading}
      title={drawer.title}
      logs={logs}
    />
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
