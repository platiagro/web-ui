// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// UI COMPONENTS
import { Modal } from 'uiComponents';

// COMPONENTS
import ResultsDrawer from 'components/Content/ExperimentsContent/Experiment/Drawer/ResultsDrawer/_';

// ACTIONS
import { getOperatorResultDataset } from 'store/operator/actions';
import { hideOperatorResults } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => dispatch(hideOperatorResults()),
    handleGetOperatorResultDataset: (
      projectId,
      experimentId,
      operator,
      page,
      pageSize
    ) =>
      dispatch(
        getOperatorResultDataset(
          projectId,
          experimentId,
          operator,
          page,
          pageSize
        )
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    isVisible: state.uiReducer.operatorResults.showOperatorResults,
    operatorId: state.operatorReducer.uuid,
    operatorMetrics: state.operatorReducer.metrics,
    operatorMetricsLoading: state.uiReducer.operatorMetrics.loading,
    operatorParameters: state.operatorReducer.parameters,
    operatorParametersLatestTraining:
      state.operatorReducer.parametersLatestTraining,
    operatorResults: state.operatorReducer.results,
    operatorResultsLoading: state.uiReducer.operatorResults.loading,
  };
};

/**
 * Container to display operator experiment results modal.
 *
 * @param {object} props Container props
 * @returns {OperatorResultsModalContainer} Container
 * @component
 */
const OperatorResultsModalContainer = (props) => {
  const {
    handleClose,
    handleGetOperatorResultDataset,
    isVisible,
    operatorId,
    operatorMetrics,
    operatorMetricsLoading,
    operatorParameters,
    operatorParametersLatestTraining,
    operatorResults,
    operatorResultsLoading,
  } = props;
  const { projectId, experimentId } = useParams();

  // format results parameters to use label from parameter and value from latest training
  const resultsParameters = [];
  if (operatorParameters) {
    for (const operatorParameter of operatorParameters) {
      let valueLatestTraining = operatorParametersLatestTraining
        ? operatorParametersLatestTraining[operatorParameter.name]
        : null;
      if (Array.isArray(valueLatestTraining)) {
        valueLatestTraining = valueLatestTraining.join();
      }
      if (typeof valueLatestTraining === 'boolean') {
        valueLatestTraining = valueLatestTraining.toString();
      }
      resultsParameters.push({
        name: operatorParameter.label
          ? operatorParameter.label
          : operatorParameter.name,
        value: valueLatestTraining,
      });
    }
  }

  const handleOnDatasetPageChange = (page, size) => {
    handleGetOperatorResultDataset(
      projectId,
      experimentId,
      operatorId,
      page,
      size
    );
  };

  return (
    <Modal
      closeButtonText={'Fechar'}
      handleClose={handleClose}
      isFullScreen={true}
      isVisible={isVisible}
      title={'Visualizar Resultados'}
    >
      <ResultsDrawer
        isToShowDownloadButtons={true}
        loading={operatorResultsLoading}
        metricsLoading={operatorMetricsLoading}
        metrics={operatorMetrics}
        onDatasetPageChange={handleOnDatasetPageChange}
        parameters={resultsParameters}
        results={operatorResults}
      />
    </Modal>
  );
};

OperatorResultsModalContainer.propTypes = {
  /** Operator results modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Operator results modal get operator result dataset handler */
  handleGetOperatorResultDataset: PropTypes.func.isRequired,
  /** Operator results modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Operator experiment metrics*/
  operatorMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator experiment metrics is loading */
  operatorMetricsLoading: PropTypes.bool.isRequired,
  /** Operator parameters */
  operatorParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator parameters latest training*/
  operatorParametersLatestTraining: PropTypes.object.isRequired,
  /** Operator experiment results */
  operatorResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator experiment results is loading */
  operatorResultsLoading: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorResultsModalContainer);
