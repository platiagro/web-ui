// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

// ANTD ICON
import { TableOutlined } from '@ant-design/icons';

// button shape
const icon = <TableOutlined />;

/**
 * Results Button Bar.
 * This component is responsible for displaying drawer results button bar.
 *
 * @param props
 */
const ResultsButtonBar = (props) => {
  // destructuring props
  const {
    handleEditClick,
    handleResultsClick,
    showingResults,
    disabled,
    loading,
  } = props;

  const disabledTitle = () =>
    disabled
      ? 'Para visualizar os resultados, primeiro execute o treinamento.'
      : '';

  // rendering component
  return showingResults ? (
    /* rendering edit or results button */
    // edit button
    <Button onClick={handleEditClick} shape='round' type='primary'>
      Visualizar parâmetros
    </Button>
  ) : (
    <>
      {/* results button */}
      <Button
        onClick={handleResultsClick}
        shape='round'
        type='primary'
        disabled={disabled}
        loading={loading}
        icon={icon}
        title={disabledTitle()}
        style={{ marginBottom: '14px', marginRight: '8px' }}
      >
        Visualizar resultados
      </Button>
    </>
  );
};

// PROP TYPES
ResultsButtonBar.propTypes = {
  /** results button bar edit button click handler */
  handleEditClick: PropTypes.func,
  /** results button bar results button click handler */
  handleResultsClick: PropTypes.func.isRequired,
  /** showing results drawer */
  showingResults: PropTypes.bool.isRequired,
  /** results button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** results button is loading */
  loading: PropTypes.bool,
};

// DEFAULT PROPS
ResultsButtonBar.defaultProps = {
  /** results button loading is false bby default */
  loading: false,
};

// EXPORT
export default ResultsButtonBar;
