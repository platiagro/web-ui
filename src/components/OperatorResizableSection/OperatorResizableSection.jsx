// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Divider } from 'antd';

// COMPONENTS
import { ResizableSection } from 'components';
import DatasetDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/GenericDrawer/_/Container';
import ResultsDrawer from '../Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';
import ResultsButtonBar from '../Content/ProjectContent/Experiment/Drawer/ResultsButtonBar';
import NotebookOutputsContainer from '../Content/ProjectContent/Experiment/Drawer/NotebookOutputs/_/Container';

/**
 * Component to display experiment flow operator parameters, results and metrics.
 *
 * @param {object} props Component props
 * @returns {OperatorResizableSection} Component
 * @component
 * @example
 * // operator name
 * const operatorName = 'Component Test';
 *
 * // operator experiment results
 * const operatorResults = [];
 *
 * // operator experiment metrics
 * const operatorMetrics = [];
 *
 * // operator experiment results is loading
 * const operatorResultsLoading = false;
 *
 * // operator experiment metrics is loading
 * const operatorMetricsLoading = false;
 *
 * // operator is a dataset operator
 * const operatorIsDataset = false;
 *
 * // show operator experiment results
 * const showExperimentResults = false;
 *
 * // operator parent experiment is finished
 * const experimentIsFinished = false;
 *
 * // show parameter button click handler
 * const handleShowParametersClick = () => alert('ShowParametersClick!');
 *
 * // show results button click handler
 * const handleShowResultsClick = () => alert('ShowResultsClick');
 *
 * // empty section placeholder
 * const emptySectionPlaceholder = (
 *   <p style={{ textAlign: 'center' }}>
 *     This is a empty section placeholder.
 *   </p>
 * );
 *
 * // rendering component
 * return (
 *  <div style={{ width: '300px', height: '900px'}}>
 *    <OperatorResizableSection
 *      operatorName={operatorName}
 *      operatorResults={operatorResults}
 *      operatorMetrics={operatorMetrics}
 *      operatorResultsLoading={operatorResultsLoading}
 *      operatorMetricsLoading={operatorMetricsLoading}
 *      operatorIsDataset={operatorIsDataset}
 *      showExperimentResults={showExperimentResults}
 *      experimentIsFinished={experimentIsFinished}
 *      handleShowParametersClick={handleShowParametersClick}
 *      handleShowResultsClick={handleShowResultsClick}
 *      emptySectionPlaceholder={emptySectionPlaceholder}
 *    />
 *  </div>
 * )
 */
const OperatorResizableSection = (props) => {
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
    // empty section placeholder
    emptySectionPlaceholder,
  } = props;

  // rendering container
  return (
    <ResizableSection
      placeholder={emptySectionPlaceholder}
      title={operatorName}
    >
      {/* rendering data set drawer */}
      {operatorIsDataset && <DatasetDrawerContainer />}
      {/* rendering generic drawer */}
      {!operatorIsDataset && !showExperimentResults && (
        <GenericDrawerContainer />
      )}
      {/* rendering results drawer */}
      {showExperimentResults && (
        <ResultsDrawer
          loading={operatorResultsLoading}
          metricsLoading={operatorMetricsLoading}
          metrics={operatorMetrics}
          results={operatorResults}
        />
      )}
      {/* divider */}
      <Divider />

      {/* rendering results button bar */}
      {!operatorIsDataset && (
        <ResultsButtonBar
          handleEditClick={handleShowParametersClick}
          handleResultsClick={handleShowResultsClick}
          showingResults={showExperimentResults}
          disabled={
            !operatorResults ||
            (!experimentIsFinished &&
              operatorResults &&
              operatorResults.lenght <= 0)
          }
        />
      )}

      {/* rendering link to Jupyter */}
      {!operatorIsDataset && !showExperimentResults && (
        <NotebookOutputsContainer />
      )}
    </ResizableSection>
  );
};

// PROP TYPES
OperatorResizableSection.propTypes = {
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
export default OperatorResizableSection;
