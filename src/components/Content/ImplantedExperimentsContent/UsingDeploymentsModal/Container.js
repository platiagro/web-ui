import React from 'react';
import { connect } from 'react-redux';

import { hideUsingDeploymentsModal } from '../../../../store/ui/actions';

import DeploymentsModal from './index';

const ContentInfo = () => {
  const styles = {
    border: '1px solid #c1c7d0',
    borderRadius: '3px',
    background: '#f4f5f7',
    padding: '10px',
  };

  const request = JSON.stringify(
    {
      data: {
        names: ['atributo1', 'atributo2'],
        ndarray: [[0, 10]],
      },
    },
    null,
    2
  );

  const response = JSON.stringify(
    {
      meta: {
        puid: 'pqvaab0ej28n89sr4ffjni1ie7',
        tags: {},
        routing: {},
        requestPath: {
          'e6065e85-a056-40b7-9e4b-4db49ee3b915':
            'platiagro/platiagro-deployment-image:0.1.0',
        },
        metrics: [],
      },
      data: {
        names: ['atributo1', 'atributo2', 'proba_classe1', 'proba_classe2'],
        ndarray: [[0, 10, 0.8902377788100774, 0.10971507514730343]],
      },
    },
    null,
    2
  );

  return (
    <div>
      <p>
        As aplicações clientes devem enviar uma requisição HTTP (REST) para a
        seguinte API:
      </p>
      <pre>
        POST /seldon/deployments/id-do-experimento/api/v1.0/predictions
        <br />
        Headers: Content-Type: application/json
      </pre>

      <h3>Request Body:</h3>
      <pre style={styles}>{request}</pre>
      <p></p>
      <p>
        <b>"names":[...] </b>- nome das colunas do conjunto de dados, sem o nome
        do atributo alvo.
        <br />
        <b>"ndarray":[...]</b> - amostras para predição, sem o valor atributo
        alvo.
      </p>

      <h3>Response Body:</h3>

      <pre style={styles}>{response}</pre>

      <p>
        <b>"names":[...] </b>- nome das colunas retornadas pelo último passo do
        fluxo de experimentos.
        <br />
        <b>"ndarray":[...]</b> - valores retornados pelo último passo do fluxo
        de experimentos.
      </p>
    </div>
  );
};

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseModal: () => dispatch(hideUsingDeploymentsModal()),
  };
};

const mapStateToProps = (state) => {
  // new project modal visible
  return {
    visible: state.uiReducer.newDeploymentsModal.visible,
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewDeploymentsModalContainer = ({ visible, handleCloseModal }) => (
  <DeploymentsModal
    visible={visible}
    handleCloseModal={handleCloseModal}
    title='Como usar um experimento implantado?'
  >
    <ContentInfo />
  </DeploymentsModal>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDeploymentsModalContainer);
