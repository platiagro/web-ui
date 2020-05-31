// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

// UI LIBS
import { ConfigProvider } from 'antd';

// COMPONENTS
import ImplantedExperimentsTable from './index';
import ImplantedExperimentsEmpty from '../../ImplantedExperimentsEmpty';

// ACTIONS
import {
  fetchImplantedExperiments,
  deleteImplantedExperiment,
} from '../../../../../store/implantedExperiments/actions';
import testImplantedExperimentInference from '../../../../../store/testExperimentInference/actions';
import { showDrawer } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchImplantedExperiments: () =>
      dispatch(fetchImplantedExperiments()),
    handleDeleteImplantedExperiment: (implantedExperimentUuid) =>
      dispatch(deleteImplantedExperiment(implantedExperimentUuid)),
    handleTestImplantedExperimentInference: (implantedExperimentUuid, file) =>
      dispatch(testImplantedExperimentInference(implantedExperimentUuid, file)),
    handleShowDrawer: (title, isDataset) => dispatch(showDrawer('Logs', false)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    implantedExperiments: state.implantedExperiments,
    loading: state.ui.implantedExperiments.loading,
  };
};

/**
 * Implanted Experiments Table Container.
 * This component is responsible for create a logic container for implanted
 * experiments table with redux.
 */
const ImplantedExperimentsTableContainer = ({
  implantedExperiments,
  handleFetchImplantedExperiments,
  handleDeleteImplantedExperiment,
  handleTestImplantedExperimentInference,
  handleShowDrawer,
  loading,
  location,
}) => {
  // CONSTANTS
  const params = queryString.parse(location.search);
  const selectedExperiment = params['experiment'];

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchImplantedExperiments();
  }, []);

  const logOpen = () => {
    console.log('ABRINDO!!');
  };

  // RENDER
  return (
    <ConfigProvider renderEmpty={ImplantedExperimentsEmpty}>
      <ImplantedExperimentsTable
        implantedExperiments={implantedExperiments}
        handleTestInference={handleTestImplantedExperimentInference}
        handleOpenLog={handleShowDrawer}
        loading={loading}
        selectedExperiment={selectedExperiment}
      />
    </ConfigProvider>
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps )(ImplantedExperimentsTableContainer)
);
