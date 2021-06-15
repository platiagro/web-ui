import React from 'react';
import PropTypes from 'prop-types';
import { Button, Result } from 'antd';

const DeploymentTestResultModalError = ({ handleShowLogs, handleTryAgain }) => {
  return (
    <Result
      status='error'
      title='Ocorreu um erro'
      subTitle='O fluxo implantado retornou um erro durante os testes. Acesse os logs para ver mais detalhes sobre o erro e tomar uma ação.'
      extra={
        <>
          <Button type='primary' key='logs' onClick={handleShowLogs}>
            Acessar Logs
          </Button>

          <Button key='retry' onClick={handleTryAgain}>
            Testar novamente
          </Button>
        </>
      }
    />
  );
};

DeploymentTestResultModalError.propTypes = {
  handleShowLogs: PropTypes.func.isRequired,
  handleTryAgain: PropTypes.func.isRequired,
};

export default DeploymentTestResultModalError;
