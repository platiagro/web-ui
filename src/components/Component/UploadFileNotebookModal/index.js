/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

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

class UploadFileNotebookModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      listNotebook: [],
    };
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  onCancelModal = () => {
    const { onCancel } = this.props;
    this.setState({ listNotebook: [] });
    onCancel();
  };

  onChangeNamespace = async (namespaceSelected) => {
    this.setState({ loading: true });
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
    this.setState({
      listNotebook: optionsNotebooks,
    });
    this.props.form.setFieldsValue({
      notebook: '',
    });
    this.setState({ loading: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const { filePath, fileName } = this.props;
      const { namespace, notebook } = values;
      this.setState({ loading: true });

      const response = await jupyterServices.uploadFile(
        namespace,
        notebook,
        filePath,
        fileName
      );

      if (response) {
        message.success(`Upload realizado com sucesso.`);
        this.onCancelModal();
        await this.sleep(1000);
        window.open(`/notebook/${namespace}/${notebook}/notebooks/${fileName}`);
      }

      this.setState({ loading: false });
    });
  };

  render() {
    const { namespaces, visible, form } = this.props;
    const { getFieldDecorator, getFieldsError } = form;
    const { listNotebook } = this.state;

    let optionsNamespaces;
    if (namespaces) {
      optionsNamespaces = namespaces.map((namespace) => (
        <Option key={namespace.namespace} value={namespace.namespace}>
          {namespace.namespace}
        </Option>
      ));
    }

    const formUI = (
      <Form layout='vertical'>
        <Form.Item label='Namespaces: '>
          {getFieldDecorator('namespace', {
            rules: [{ required: true, message: ' ' }],
          })(
            <Select onChange={this.onChangeNamespace}>
              {optionsNamespaces}
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Notebooks: '>
          {getFieldDecorator('notebook', {
            rules: [{ required: true, message: ' ' }],
          })(<Select>{listNotebook}</Select>)}
        </Form.Item>
      </Form>
    );

    return (
      <Modal
        visible={visible}
        title='Editar arquivo no jupyter notebook'
        okText='Editar'
        cancelText='Cancelar'
        onCancel={this.onCancelModal}
        onOk={this.handleSubmit}
        okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      >
        <Spin spinning={this.state.loading} delay={100}>
          {formUI}
        </Spin>
      </Modal>
    );
  }
}

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
