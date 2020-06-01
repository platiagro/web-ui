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
}) => (
  // div container
  <div>
    {/* rendering edit or results button */}
    {showingResults ? (
      // edit button
      <Button
        onClick={handleEditClick}
        className='ant-btn-oval'
        type='primary'
      >
        Visualizar parâmetros
      </Button>
    ) : (
      <>
        {/* results button */}
        <Button
          onClick={handleResultsClick}
          className='ant-btn-oval'
          type='primary'
        >
          Visualizar resultado
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
};

// EXPORT
export default ResultsButtonBar;
