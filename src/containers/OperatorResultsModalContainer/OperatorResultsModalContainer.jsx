// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// UI COMPONENTS
import { Modal } from 'uiComponents';

// COMPONENTS
import ResultsDrawer from 'components/Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';

// ACTIONS
import { hideOperatorResults } from '../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // close results modal
    handleClose: () => dispatch(hideOperatorResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // operator experiment results
    operatorResults: state.operatorReducer.results,
    // operator experiment metrics
    operatorMetrics: state.operatorReducer.metrics,
    // operator parameters
    operatorParameters: state.operatorReducer.parameters,
    // operator parameters latestTraining
    operatorParametersLatestTraining:
      state.operatorReducer.parametersLatestTraining,
    // operator experiment results is loading
    operatorResultsLoading: state.uiReducer.operatorResults.loading,
    // operator experiment metrics is loading
    operatorMetricsLoading: state.uiReducer.operatorMetrics.loading,
    // show operator results modal
    isVisible: state.uiReducer.operatorResults.showOperatorResults,
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
  // destructuring container props
  const {
    // operator experiment results
    operatorResults,
    // operator experiment metrics
    operatorMetrics,
    // operator experiment results is loading
    operatorResultsLoading,
    // operator parameters
    operatorParameters,
    // operator parameters latestTraining
    operatorParametersLatestTraining,
    // operator experiment metrics is loading
    operatorMetricsLoading,
    // close results modal handler
    handleClose,
    // show operator results modal
    isVisible,
  } = props;

  // CONSTANTS
  // button text
  const closeButtonText = 'Fechar';

  // modal title
  const title = 'Visualizar Resultados';

  // modal is full screen
  const isFullScreen = true;

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

  // rendering component
  return (
    <Modal
      closeButtonText={closeButtonText}
      handleClose={handleClose}
      isFullScreen={isFullScreen}
      isVisible={isVisible}
      title={title}
    >
      <ResultsDrawer
        loading={operatorResultsLoading}
        metricsLoading={operatorMetricsLoading}
        metrics={operatorMetrics}
        results={operatorResults}
        parameters={resultsParameters}
      />
    </Modal>
  );
};

OperatorResultsModalContainer.propTypes = {
  /** Operator results modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Operator results modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Operator experiment metrics*/
  operatorMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator parameters */
  operatorParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator parameters latest training*/
  operatorParametersLatestTraining: PropTypes.object.isRequired,
  /** Operator experiment metrics is loading */
  operatorMetricsLoading: PropTypes.bool.isRequired,
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
