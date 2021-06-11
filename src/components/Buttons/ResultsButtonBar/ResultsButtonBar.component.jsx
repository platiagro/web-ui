import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { TableOutlined } from '@ant-design/icons';

const ResultsButtonBar = ({
  loading,
  disabled,
  showingResults,
  handleEditClick,
  handleResultsClick,
}) => {
  const getDisabledTitle = () => {
    return disabled
      ? 'Para visualizar os resultados, primeiro execute o treinamento.'
      : '';
  };

  return showingResults ? (
    <Button onClick={handleEditClick} shape='round' type='primary'>
      Visualizar parâmetros
    </Button>
  ) : (
    <Button
      onClick={handleResultsClick}
      shape='round'
      type='primary-inverse'
      disabled={disabled}
      loading={loading}
      icon={<TableOutlined />}
      title={getDisabledTitle()}
      style={{ marginBottom: '14px', marginRight: '8px' }}
    >
      Visualizar resultados
    </Button>
  );
};

ResultsButtonBar.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  showingResults: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func,
  handleResultsClick: PropTypes.func.isRequired,
};

ResultsButtonBar.defaultProps = {
  loading: false,
};

export default ResultsButtonBar;
