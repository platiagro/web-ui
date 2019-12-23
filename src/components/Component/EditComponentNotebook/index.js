import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import UploadFileNotebookModal from '../UploadFileNotebookModal';
import * as jupyterServices from '../../../services/jupyterApi';

const EditComponentNotebook = (props) => {
  const { filePath, fileName } = props;
  const [visible, setVisible] = useState(false);
  const [namespaces, setNamespaces] = useState([]);

  const fetchDetails = async () => {
    const namespacesRespose = await jupyterServices.getNamespaces();
    let jupyterNamespaces;
    if (namespacesRespose) {
      jupyterNamespaces = namespacesRespose.data.namespaces;
    }
    setNamespaces(jupyterNamespaces);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  /**
   * Function to toggle modal visibility
   */
  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <UploadFileNotebookModal
        visible={visible}
        onCancel={toggleModal}
        fileName={fileName}
        filePath={filePath}
        namespaces={namespaces}
      />
      <br />
      <Button type='primary' onClick={toggleModal}>
        Editar no Notebook
      </Button>
    </>
  );
};

export default EditComponentNotebook;
