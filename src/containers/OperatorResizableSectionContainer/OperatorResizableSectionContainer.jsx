// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENTS
import { OperatorResizableSection } from 'components';

// ACTIONS
import { showDrawerResults, hideDrawerResults } from '../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show parameter button click handler
    handleShowParametersClick: () => dispatch(hideDrawerResults()),
    // show results button click handler
    handleShowResultsClick: () => dispatch(showDrawerResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // operator name
    operatorName: state.operatorReducer.name,
    // operator experiment results
    operatorResults: state.operatorReducer.results,
    // operator experiment metrics
    operatorMetrics: state.operatorReducer.metrics,
    // operator experiment results is loading
    operatorResultsLoading: state.uiReducer.operatorResults.loading,
    // operator experiment metrics is loading
    operatorMetricsLoading: state.uiReducer.operatorMetrics.loading,
    // operator is a dataset operator
    operatorIsDataset: state.operatorReducer.name === 'Conjunto de dados',
    // show operator experiment results
    showExperimentResults: state.uiReducer.drawer.showResults,
    // operator parent experiment is finished
    experimentIsFinished: state.experimentReducer.succeeded,
  };
};

// MOCKS
// empty section placeholder
const emptySectionPlaceholder = (
  <p style={{ textAlign: 'center' }}>
    Selecione um operador para visualizar ou editar os parâmetros.
  </p>
);

/**
 * Container to display experiment flow operator parameters, results and metrics.
 *
 * @param {object} props Container props
 * @returns {OperatorResizableSectionContainer} Container
 * @component
 */
const OperatorResizableSectionContainer = (props) => {
  // destructuring container props
  const {
    // operator name
    operatorName,
    // operator experiment results
    operatorResults,
    // operator experiment metrics
    operatorMetrics,
    // operator experiment results is loading
    operatorResultsLoading,
    // operator experiment metrics is loading
    operatorMetricsLoading,
    // operator is a dataset operator
    operatorIsDataset,
    // show operator experiment results
    showExperimentResults,
    // operator parent experiment is finished
    experimentIsFinished,
    // show parameter button click handler
    handleShowParametersClick,
    // show results button click handler
    handleShowResultsClick,
  } = props;

  // rendering container
  return (
    <OperatorResizableSection
      operatorName={operatorName}
      operatorResults={operatorResults}
      operatorMetrics={operatorMetrics}
      operatorResultsLoading={operatorResultsLoading}
      operatorMetricsLoading={operatorMetricsLoading}
      operatorIsDataset={operatorIsDataset}
      showExperimentResults={showExperimentResults}
      experimentIsFinished={experimentIsFinished}
      handleShowParametersClick={handleShowParametersClick}
      handleShowResultsClick={handleShowResultsClick}
      emptySectionPlaceholder={emptySectionPlaceholder}
    />
  );
};

// PROP TYPES
OperatorResizableSectionContainer.propTypes = {
  /** Operator name */
  operatorName: PropTypes.string.isRequired,
  /** Operator experiment results */
  operatorResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator experiment metrics*/
  operatorMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator experiment results is loading */
  operatorResultsLoading: PropTypes.bool.isRequired,
  /** Operator experiment metrics is loading */
  operatorMetricsLoading: PropTypes.bool.isRequired,
  /** Operator is a dataset operator */
  operatorIsDataset: PropTypes.bool.isRequired,
  /** Show operator experiment results */
  showExperimentResults: PropTypes.bool.isRequired,
  /** Operator parent experiment is finished */
  experimentIsFinished: PropTypes.bool.isRequired,
  /** Show parameter button click handler */
  handleShowParametersClick: PropTypes.func.isRequired,
  /** Show results button click handler */
  handleShowResultsClick: PropTypes.func.isRequired,
  /** Empty section placeholder */
  emptySectionPlaceholder: PropTypes.node.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorResizableSectionContainer);
