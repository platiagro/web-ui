// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Divider } from 'antd';

/**
 * Results Button Bar.
 * This component is responsible for displaying drawer results button bar.
 */
const ResultsButtonBar = ({
  handleEditClick,
  handleResultsClick,
  showingResults,
  disabled,
}) => (
  // div container
  <div style={{ textAlign: 'center' }}>
    {/* rendering edit or results button */}
    {showingResults ? (
      // edit button
      <Button onClick={handleEditClick} className='ant-btn-oval' type='primary'>
        Visualizar parâmetros
      </Button>
    ) : (
      <>
        {/* results button */}
        <Button
          onClick={handleResultsClick}
          className='ant-btn-oval'
          type='primary'
          disabled={disabled}
          title={
            disabled
              ? 'Para visualizar os resultados, primeiro execute o treinamento.'
              : ''
          }
        >
          Visualizar resultados
        </Button>

        {/* divider */}
        <Divider />
      </>
    )}
  </div>
);

// PROP TYPES
ResultsButtonBar.propTypes = {
  /** results button bar edit button click handler */
  handleEditClick: PropTypes.func.isRequired,
  /** results button bar results button click handler */
  handleResultsClick: PropTypes.func.isRequired,
  /** showing results drawer */
  showingResults: PropTypes.bool.isRequired,
  /** results button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default ResultsButtonBar;
