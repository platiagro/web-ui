/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { Button, Icon, message, Upload } from 'antd';

import UploadFileNotebookModal from '../UploadFileNotebookModal';

import * as componentsServices from '../../../services/componentsApi';

const { Dragger } = Upload;

class ComponentTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsVisible: false,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  showModal() {
    this.setState({ modalIsVisible: true });
  }

  hideModal() {
    const { form } = this.formRef.props;

    this.setState({ modalIsVisible: false });

    form.resetFields();
  }

  render() {
    const { details, namespaces, changeDetails } = this.props;
    const { modalIsVisible } = this.state;

    const DraggerProps = {
      multiple: false,
      action: `${componentsServices.uploadUrl}/${details.uuid}`,
      defaultFileList: details.file ? [details.file] : [],
      beforeUpload: (file) => {
        const auxFile = file;
        auxFile.path = `components/${details.uuid}/${file.name}`;
        auxFile.url = `${componentsServices.downloadUrl}/${details.uuid}/${file.name}`;
      },
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          message.success(`${info.file.name} salvo com sucesso.`);
          const auxDetails = details;
          auxDetails.file = info.file;
          changeDetails(auxDetails);
        } else if (status === 'removed') {
          if (!info.file.error) {
            message.success(`${info.file.name} removido com sucesso.`);
          }
        } else if (status === 'error') {
          if (info.file.error.status === 400) {
            message.error(`Só é possível realizar o upload de um arquivo!`);
          } else {
            message.error(`Falha no upload do arquivo ${info.file.name}`);
          }
        }
      },
      onRemove: async (file) => {
        if (!file.error) {
          const response = await componentsServices.deleteFiles(details.uuid, [
            file.name,
          ]);
          if (!response) {
            return false;
          }
        }
        const auxDetails = details;
        auxDetails.file = null;
        changeDetails(auxDetails);
        return true;
      },
    };

    return (
      <>
        <UploadFileNotebookModal
          filePath={details.file ? details.file.path : ''}
          fileName={details.file ? details.file.name : ''}
          namespaces={namespaces}
          wrappedComponentRef={this.saveFormRef}
          visible={modalIsVisible}
          onCancel={this.hideModal}
        />
        <Dragger {...DraggerProps}>
          <p className='ant-upload-drag-icon'>
            <Icon type='inbox' />
          </p>
          <p className='ant-upload-text'>
            Clique ou arraste o arquivo para esta área para fazer o upload
          </p>
        </Dragger>
        <br />
        <Button
          className='float-right'
          style={
            details.file
              ? { float: 'right' }
              : { display: 'none', float: 'right' }
          }
          onClick={this.showModal}
          type='primary'
        >
          Editar arquivo
        </Button>
      </>
    );
  }
}

ComponentTable.propTypes = {
  details: PropTypes.object.isRequired,
  namespaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeDetails: PropTypes.func.isRequired,
};

export default ComponentTable;
