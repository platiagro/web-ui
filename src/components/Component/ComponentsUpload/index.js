/**
 * Component responsible for:
 * - Upload file
 * - Delete uploaded file
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, message, Upload } from 'antd';
import UploadFileNotebookModal from '../UploadFileNotebookModal';
import * as componentsServices from '../../../services/componentsApi';
import { updateComponentFile } from '../../../store/actions/componentActions';

const { Dragger } = Upload;

const ComponentsUpload = (props) => {
  const { details, namespaces, onUpdateComponentFile } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
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
        onUpdateComponentFile(info.file);
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
      onUpdateComponentFile(null);
      return true;
    },
  };

  /**
   * Function to toggle modal visibility
   */
  const toggleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <>
      <UploadFileNotebookModal
        filePath={details.file ? details.file.path : ''}
        fileName={details.file ? details.file.name : ''}
        namespaces={namespaces}
        visible={modalIsVisible}
        onCancel={toggleModal}
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
        onClick={toggleModal}
        type='primary'
      >
        Editar arquivo
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.component.details,
    namespaces: state.component.namespaces,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateComponentFile: (file) => {
      dispatch(updateComponentFile(file));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsUpload);
