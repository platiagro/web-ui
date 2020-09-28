// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENTS
import { OperatorResizableSection } from 'components';

// ACTIONS
import { showOperatorResults } from '../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show results button click handler
    handleShowResultsClick: () => dispatch(showOperatorResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    // operator name
    operatorName: state.operatorReducer.name,
    // operator experiment results
    operatorResults: state.operatorReducer.results,
    // operator description
    operatorDescription: state.operatorReducer.description,
    // operator is a dataset operator
    operatorIsDataset: state.operatorReducer.tags
      ? state.operatorReducer.tags.includes('DATASETS')
      : false,
    // show operator experiment results
    showExperimentResults: state.uiReducer.operatorResults.showOperatorResults,
    // operator parent experiment is finished
    experimentIsFinished: state.experimentReducer.succeeded,
    // operator status
    operatorStatus: state.operatorReducer.status,
    // operator logs
    operatorLogs: state.operatorReducer.logs,
  };
};

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
    // operator is a dataset operator
    operatorIsDataset,
    // operator parent experiment is finished
    experimentIsFinished,
    // show results button click handler
    handleShowResultsClick,
    // operator description
    operatorDescription,
    // operator status
    operatorStatus,
    // operator logs
    operatorLogs,
  } = props;

  // rendering container
  return (
    <OperatorResizableSection
      operatorName={operatorName}
      operatorResults={operatorResults}
      operatorIsDataset={operatorIsDataset}
      experimentIsFinished={experimentIsFinished}
      handleShowResultsClick={handleShowResultsClick}
      operatorDescription={operatorDescription}
      operatorStatus={operatorStatus}
      operatorLogs={operatorLogs}
    />
  );
};

// PROP TYPES
OperatorResizableSectionContainer.propTypes = {
  /** Operator name */
  operatorName: PropTypes.string.isRequired,
  /** Operator experiment results */
  operatorResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator is a dataset operator */
  operatorIsDataset: PropTypes.bool.isRequired,
  /** Operator parent experiment is finished */
  experimentIsFinished: PropTypes.bool.isRequired,
  /** Show results button click handler */
  handleShowResultsClick: PropTypes.func.isRequired,
  /** Operator description */
  operatorDescription: PropTypes.string,
  /** Operator status */
  operatorStatus: PropTypes.string,
  /** Operator logs */
  operatorLogs: PropTypes.string,
};

// DEFAULT PROPS
OperatorResizableSectionContainer.defaultProps = {
  /** Operator description */
  operatorDescription: undefined,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorResizableSectionContainer);
