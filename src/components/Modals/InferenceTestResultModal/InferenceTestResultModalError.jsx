import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Result } from 'antd';

/**
 * Component to render error placeholder or result information
 * based on status of experimentInference.
 *
 * @returns {Component} Error placeholder, Table or a adaptable component
 */

const InferenceTestResultModalError = (props) => {
  const { getDeployExperimentLogs, retryTest } = props;

  return (
    <Result
      status='error'
      title='Ocorreu um erro'
      subTitle='O fluxo implantado retornou um erro durante os testes. Acesse os logs para ver mais detalhes sobre o erro e tomar uma ação.'
      extra={[
        <Button type='primary' key='logs' onClick={getDeployExperimentLogs}>
          Acessar Logs
        </Button>,
        <Button key='retry' onClick={retryTest}>
          Testar novamente
        </Button>,
      ]}
    />
  );
};

InferenceTestResultModalError.propTypes = {
  getDeployExperimentLogs: PropTypes.func.isRequired,
  retryTest: PropTypes.func.isRequired,
};

export default InferenceTestResultModalError;
