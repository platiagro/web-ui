// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
import { getDeployExperimentLogs } from 'store/logs/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchImplantedExperiments: () =>
      dispatch(fetchImplantedExperiments()),
    handleDeleteImplantedExperiment: (implantedExperimentUuid) =>
      dispatch(deleteImplantedExperiment(implantedExperimentUuid)),
    handleTestImplantedExperimentInference: (implantedExperimentUuid, file) =>
      dispatch(testImplantedExperimentInference(implantedExperimentUuid, file)),
    getDeployExperimentLogs: (deployId) =>
      dispatch(getDeployExperimentLogs(deployId)),
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
  getDeployExperimentLogs,
}) => {
  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchImplantedExperiments();
  }, []);

  const handleOpenLog = (deployId) => {
    getDeployExperimentLogs(deployId);
  };

  // RENDER handleOpenLog
  return (
    <ConfigProvider renderEmpty={ImplantedExperimentsEmpty}>
      <ImplantedExperimentsTable
        implantedExperiments={implantedExperiments}
        handleTestInference={handleTestImplantedExperimentInference}
        handleOpenLog={handleShowDrawer}
        loading={loading}
      />
    </ConfigProvider>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImplantedExperimentsTableContainer);
