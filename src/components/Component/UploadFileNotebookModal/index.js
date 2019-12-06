/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, message, Select, Spin } from 'antd';
import * as jupyterServices from '../../../services/jupyterApi';

const { Option } = Select;

/* 
    This function is used to check if form has errors
  */
const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const UploadFileNotebookModal = (props) => {
  const { namespaces, visible, form, filePath, fileName, onCancel } = props;
  const { getFieldDecorator, getFieldsError } = form;
  const [loading, setLoading] = useState(false);
  const [listNotebook, setListNotebook] = useState([]);

  const onCancelModal = () => {
    form.resetFields();
    setListNotebook([]);
    onCancel();
  };

  const onChangeNamespace = async (namespaceSelected) => {
    setLoading(true);

    const response = await jupyterServices.getNotebook(namespaceSelected);

    let optionsNotebooks;
    if (response) {
      const { notebooks } = response.data;
      if (notebooks && notebooks.length > 0) {
        optionsNotebooks = notebooks.map((notebook) => (
          <Option key={notebook.name} value={notebook.name}>
            {notebook.name}
          </Option>
        ));
      } else {
        optionsNotebooks = [
          <Option
            key='new-notebook'
            value='new-notebook'
            onClick={() => {
              window.open('/jupyter/');
            }}
          >
            <a>Criar notebook</a>
          </Option>,
        ];
      }
    }

    setListNotebook(optionsNotebooks);
    setLoading(false);
    form.setFieldsValue({
      notebook: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      setLoading(true);
      const { namespace, notebook } = values;
      const response = await jupyterServices.uploadFile(
        namespace,
        notebook,
        filePath,
        fileName
      );

      if (response) {
        message.success(`Upload realizado com sucesso.`);
        onCancelModal();
        await sleep(1000);
        window.open(`/notebook/${namespace}/${notebook}/notebooks/${fileName}`);
      }
      setLoading(false);
    });
  };

  let optionsNamespaces;
  if (namespaces) {
    optionsNamespaces = namespaces.map((namespace) => (
      <Option key={namespace.namespace} value={namespace.namespace}>
        {namespace.namespace}
      </Option>
    ));
  }

  return (
    <Modal
      visible={visible}
      title='Editar arquivo no jupyter notebook'
      okText='Editar'
      cancelText='Cancelar'
      onCancel={onCancelModal}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
    >
      <Spin spinning={loading} delay={100}>
        <Form layout='vertical'>
          <Form.Item label='Namespaces: '>
            {getFieldDecorator('namespace', {
              rules: [{ required: true, message: ' ' }],
            })(
              <Select onChange={onChangeNamespace}>{optionsNamespaces}</Select>
            )}
          </Form.Item>
          <Form.Item label='Notebooks: '>
            {getFieldDecorator('notebook', {
              rules: [{ required: true, message: ' ' }],
            })(<Select>{listNotebook}</Select>)}
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

UploadFileNotebookModal.propTypes = {
  filePath: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  namespaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'upload-file-notebook' })(
  UploadFileNotebookModal
);
