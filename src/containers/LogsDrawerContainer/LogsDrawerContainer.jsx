// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { LogsDrawer } from 'components';

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
 * Container to display logs drawer.
 * @param {object} props Container props
 * @returns {LogsDrawerContainer} Container
 */
const LogsDrawerContainer = (props) => {
  const { drawer, handleHideDrawer, logs } = props;
  return (
    <LogsDrawer
      handleClose={handleHideDrawer}
      isLoading={drawer.loading}
      isVisible={drawer.visible}
      logs={logs}
      title={drawer.title}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogsDrawerContainer);
