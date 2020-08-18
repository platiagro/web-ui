// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

// COMPONENTS
import DatasetDrawer from '../DatasetDrawer/_/Container';
import GenericDrawer from '../GenericDrawer/_/Container';
import ResultsDrawer from '../ResultsDrawer/_';
import ResultsButtonBar from '../ResultsButtonBar';
import NotebookOutputs from '../NotebookOutputs/_/Container';

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({
  title,
  isVisible,
  handleClose,
  results,
  metrics,
  resultsLoading,
  metricsLoading,
  isDataset,
  showResults,
  handleEditClick,
  handleResultsClick,
  experimentTrained,
}) => {
  // RENDER
  return (
    // ant design drawer container
    <AntDrawer
      width={showResults ? '30vw' : 350}
      title={<strong>{title}</strong>}
      visible={isVisible}
      closable
      onClose={handleClose}
      keyboard={false}
    >
      {/* rendering data set drawer */}
      {isDataset && <DatasetDrawer />}
      {/* rendering generic drawer */}
      {!isDataset && !showResults && <GenericDrawer />}
      {/* rendering results drawer */}
      {showResults && (
        <ResultsDrawer
          loading={resultsLoading}
          metricsLoading={metricsLoading}
          metrics={metrics}
          results={results}
        />
      )}

      {/* rendering results button bar */}
      {!isDataset && (
        <ResultsButtonBar
          handleEditClick={handleEditClick}
          handleResultsClick={handleResultsClick}
          showingResults={showResults}
          disabled={
            !results || (!experimentTrained && results && results.lenght <= 0)
          }
        />
      )}

      {/* rendering link to Jupyter */}
      {!isDataset && !showResults && <NotebookOutputs />}
    </AntDrawer>
  );
};

// PROP TYPES
Drawer.propTypes = {
  /** drawer title string */
  title: PropTypes.string.isRequired,
  /** drawer is visible */
  isVisible: PropTypes.bool.isRequired,
  /** drawer is dataset */
  isDataset: PropTypes.bool.isRequired,
  /** drawer results is loadig */
  resultsLoading: PropTypes.bool.isRequired,
  /** drawer metrics is loadig */
  metricsLoading: PropTypes.bool.isRequired,
  /** drawer results list */
  results: PropTypes.arrayOf(PropTypes.object),
  /** drawer metrics list */
  metrics: PropTypes.arrayOf(PropTypes.object),
  /** select input change handler */
  handleClose: PropTypes.func.isRequired,
  /** drawer show results */
  showResults: PropTypes.bool.isRequired,
  /** experiment is trained */
  experimentTrained: PropTypes.bool.isRequired,
};

// PROP DEFAULT VALUES
Drawer.defaultProps = {
  /** drawer results list */
  results: undefined,
};

// EXPORT
export default Drawer;
