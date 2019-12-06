import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const NewComponentModal = (props) => {
  const { visible, form, history } = props;
  const { onCreate, onCancel } = props;
  const { getFieldDecorator, getFieldsError } = form;

  /* 
  This function is used to check if form has errors
*/
  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      onCreate(values.name, history);
    });
  };

  return (
    <Modal
      visible={visible}
      title='Novo Componente'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={onCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
    >
      <Form layout='vertical'>
        <Form.Item label='Qual o nome do seu componente?'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o componente!',
              },
            ],
          })(<Input allowClear autoFocus />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewComponentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'new-component' })(NewComponentModal);
