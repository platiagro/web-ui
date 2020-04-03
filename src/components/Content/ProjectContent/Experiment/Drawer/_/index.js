// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

// COMPONENTS
import DatasetDrawer from '../DatasetDrawer/_/Container';
import GenericDrawer from '../GenericDrawer/_/Container';
import ResultsDrawer from '../ResultsDrawer/_';
import ResultsButtonBar from '../ResultsButtonBar';

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ title, isVisible, handleClose, results, isDataset }) => {
  // HOOKS
  // show results
  const [showResults, setShowResults] = useState(false);

  // HANDLERS
  // edit click handle
  const handleEditClick = () => setShowResults(false);
  // results click handle
  const handleResultsClick = () => setShowResults(true);

  // RENDER
  return (
    // ant design drawer container
    <AntDrawer
      width={350}
      title={title}
      visible={isVisible}
      closable
      onClose={handleClose}
    >
      {/* rendering data set drawer */}
      {isDataset && !showResults && <DatasetDrawer />}
      {/* rendering generic drawer */}
      {!isDataset && !showResults && <GenericDrawer />}
      {/* rendering results drawer */}
      {showResults && <ResultsDrawer results={results} />}

      {/* rendering results button bar */}
      {results && (
        <ResultsButtonBar
          handleEditClick={handleEditClick}
          handleResultsClick={handleResultsClick}
          showingResults={showResults}
        />
      )}
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
  /** drawer results list */
  results: PropTypes.arrayOf(PropTypes.object),
  /** select input change handler */
  handleClose: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
Drawer.defaultProps = {
  /** drawer results list */
  results: undefined,
};

// EXPORT
export default Drawer;
