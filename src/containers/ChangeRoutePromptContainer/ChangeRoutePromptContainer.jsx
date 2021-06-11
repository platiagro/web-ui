import React, { useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { useSelector } from 'react-redux';

const datasetIsUploadingSelector = ({ datasetReducer }) => {
  return datasetReducer.isUploading;
};

const message =
  'Você está enviando um arquivo, ao sair da tela atual o envio será cancelado automaticamente. Deseja continuar?';

const ChangeRoutePromptContainer = () => {
  const datasetIsUploading = useSelector(datasetIsUploadingSelector);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (datasetIsUploading) e.returnValue = message;
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, [datasetIsUploading]);

  return <Prompt when={datasetIsUploading} message={message} />;
};

export default ChangeRoutePromptContainer;
