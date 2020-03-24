// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

// COMPONENTS
import DatasetDrawer from '../DatasetDrawer/_/Container';
import GenericDrawer from '../GenericDrawer/_';
import ResultsDrawer from '../ResultsDrawer/_';
import ResultsButtonBar from '../ResultsButtonBar';

// MOCKS
import datasetColumnsMock from '../DatasetDrawer/ColumnsTable/_datasetColumnsMock';
import genericDrawerMock from '../GenericDrawer/_/_genericDrawerMock';

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
      {isDataset && !showResults && (
        <DatasetDrawer
          handleSetColumnType={(
            headerId,
            columnId,
            columnType,
            columnPosition
          ) =>
            alert(
              `headerId: ${headerId}, columnId: ${columnId}, columnType: ${columnType}, columnPosition: ${columnPosition}`
              // eslint-disable-next-line
        )}
          projectId='01'
          parameters={{ parametro: { subparametro: 'parametro-sub' } }}
          handleSetTarget={(projectId, experimentId, targetId, parameters) =>
            alert(
              `projectId: ${projectId}, experimentId: ${experimentId}, targetId: ${targetId}, parameters: ${parameters}`
              // eslint-disable-next-line
        )}
          experimentId='01'
          handleUploadFiles={(projectId, experimentId, formData) =>
            alert(
              `projectId: ${projectId}, experimentId: ${experimentId}, formData: ${formData}`
              // eslint-disable-next-line
        )}
          targetColumnId='01'
          loading={false}
          columns={datasetColumnsMock}
        />
      )}
      {/* rendering generic drawer */}
      {!isDataset && !showResults && (
        <GenericDrawer
          drawerInputs={genericDrawerMock}
          drawerTip={
            <div>
              <h3>Teste de dica!</h3>
              <p>Essa é uma dica!</p>
            </div>
          }
        />
      )}
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
