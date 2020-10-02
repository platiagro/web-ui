// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ROUTER COMPONENTS
import { Prompt } from 'react-router-dom';

// STATES
const mapStateToProps = (state) => {
  return {
    datasetIsUploading: state.datasetReducer.isUploading,
  };
};

const ChangeRoutePromptContainer = (props) => {
  // PROPS / CONSTANTS
  // destructuring props
  const { datasetIsUploading } = props;

  // prompt message
  const message =
    'Você está enviando um arquivo, ao sair da tela atual o envio será cancelado automaticamente. Deseja continuar?';

  // rendering component
  return <Prompt when={datasetIsUploading} message={message} />;
};

ChangeRoutePromptContainer.propTypes = {
  /** Dataset is uploading */
  datasetIsUploading: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default connect(mapStateToProps)(ChangeRoutePromptContainer);
