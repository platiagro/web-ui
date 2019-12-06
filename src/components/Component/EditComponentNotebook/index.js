import React from 'react';

import { Button } from 'antd';

import UploadFileNotebookModal from '../UploadFileNotebookModal';
import * as jupyterServices from '../../../services/jupyterApi';

class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false, namespaces: [] };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    const namespacesRespose = await jupyterServices.getNamespaces();
    let jupyterNamespaces;
    if (namespacesRespose) {
      jupyterNamespaces = namespacesRespose.data.namespaces;
    }
    this.setState({ namespaces: jupyterNamespaces });
  };

  handleCancel() {
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({ visible: true });
  }

  render() {
    const { visible, namespaces } = this.state;
    const { filePath, fileName } = this.props;

    return (
      <>
        <UploadFileNotebookModal
          visible={visible}
          onCancel={this.handleCancel}
          fileName={fileName}
          filePath={filePath}
          namespaces={namespaces}
        />
        <br />
        <Button type='primary' onClick={this.showModal}>
          Editar no Notebook
        </Button>
      </>
    );
  }
}

export default NotebookEdit;
