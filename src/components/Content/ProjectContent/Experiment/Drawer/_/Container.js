// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from './index';

// ACTIONS
import {
  hideDrawer,
  showDrawerResults,
  hideDrawerResults,
} from '../../../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // hide drawer action
    handleHideDrawer: () => dispatch(hideDrawer()),
    // hide drawer results action
    handleHideDrawerResults: () => dispatch(hideDrawerResults()),
    // show drawer results action
    handleShowDrawerResults: () => dispatch(showDrawerResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    drawer: state.ui.drawer,
    results: state.operator.results,
    metrics: state.operator.metrics,
    resultsLoading: state.ui.operatorResults.loading,
    metricsLoading: state.ui.operatorMetrics.loading,
    experimentTrained: state.experiment.succeeded,
  };
};

/**
 * Drawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DrawerContainer = ({
  drawer,
  handleHideDrawer,
  results,
  metrics,
  resultsLoading,
  metricsLoading,
  handleHideDrawerResults,
  handleShowDrawerResults,
  experimentTrained,
}) => {
  // RENDER
  return (
    <Drawer
      isVisible={drawer.visible}
      isDataset={drawer.isDataset}
      showResults={drawer.showResults}
      handleClose={handleHideDrawer}
      results={results}
      metrics={metrics}
      resultsLoading={resultsLoading}
      metricsLoading={metricsLoading}
      title={drawer.title}
      handleEditClick={handleHideDrawerResults}
      handleResultsClick={handleShowDrawerResults}
      experimentTrained={experimentTrained}
    />
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
