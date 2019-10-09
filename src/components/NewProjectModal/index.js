import React from 'react';

import PropTypes from 'prop-types';

import { Modal, Form, Input } from 'antd';

/* 
  This function is used to check if form has errors
*/
const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

/*
  This component is responsible for renders the new project modal.

  All props is required.
*/

/* 
  Next line is disabled on eslint because we need a statefull component without
  a state variable or methods
*/

// eslint-disable-next-line
class NewProjectModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    const handleSubmit = (e) => {
      e.preventDefault();
      onCreate();
    };

    return (
      <Modal
        visible={visible}
        title='Novo Projeto'
        okText='Criar'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={onCreate}
        okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      >
        <Form layout='vertical' onSubmit={handleSubmit}>
          <Form.Item label='Qual o nome do seu projeto?'>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Por favor insira um nome para o projeto!',
                },
              ],
              initialValue: 'Novo Projeto',
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

NewProjectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'new-project' })(NewProjectModal);
