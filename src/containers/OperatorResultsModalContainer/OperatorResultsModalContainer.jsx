// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// UI COMPONENTS
import { Modal } from 'components/_Ui';

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
    // operator experiment metrics is loading
    operatorMetricsLoading,
    //
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
