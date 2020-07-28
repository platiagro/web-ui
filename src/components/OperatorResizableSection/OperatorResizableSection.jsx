// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Divider } from 'antd';

// COMPONENTS
import { ResizableSection } from 'components';
import DatasetDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/GenericDrawer/_/Container';
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
 * // operator is a dataset operator
 * const operatorIsDataset = false;
 *
 * // operator parent experiment is finished
 * const experimentIsFinished = false;
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
 *      operatorIsDataset={operatorIsDataset}
 *      experimentIsFinished={experimentIsFinished}
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
    // operator is a dataset operator
    operatorIsDataset,
    // operator parent experiment is finished
    experimentIsFinished,
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
      {!operatorIsDataset && <GenericDrawerContainer />}

      {/* divider */}
      <Divider />

      {/* rendering results button bar */}
      {!operatorIsDataset && (
        <ResultsButtonBar
          handleEditClick={() => undefined}
          handleResultsClick={handleShowResultsClick}
          // always show results button
          showingResults={false}
          disabled={
            !operatorResults ||
            (!experimentIsFinished &&
              operatorResults &&
              operatorResults.lenght <= 0)
          }
        />
      )}

      {/* rendering link to Jupyter */}
      {!operatorIsDataset && <NotebookOutputsContainer />}
    </ResizableSection>
  );
};

// PROP TYPES
OperatorResizableSection.propTypes = {
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
  /** Empty section placeholder */
  emptySectionPlaceholder: PropTypes.node.isRequired,
};

// EXPORT DEFAULT
export default OperatorResizableSection;
