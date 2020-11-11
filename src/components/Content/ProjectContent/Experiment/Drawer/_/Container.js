// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from './index';

// ACTIONS
import {
  fetchHideOperatorDrawer,
  showDrawerResults,
  hideDrawerResults,
} from '../../../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // hide drawer action
    handleHideDrawer: () => dispatch(fetchHideOperatorDrawer()),
    // hide drawer results action
    handleHideDrawerResults: () => dispatch(hideDrawerResults()),
    // show drawer results action
    handleShowDrawerResults: () => dispatch(showDrawerResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    drawer: state.uiReducer.operatorDrawer,
    results: state.operatorReducer.results,
    metrics: state.operatorReducer.metrics,
    resultsLoading: state.uiReducer.operatorResults.loading,
    metricsLoading: state.uiReducer.operatorMetrics.loading,
    experimentTrained: state.experimentReducer.succeeded,
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
