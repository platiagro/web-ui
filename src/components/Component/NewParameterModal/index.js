import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, message, Modal, Select, Switch } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const NewParameterModal = (props) => {
  const { visible, onCancel, onSubmit, form } = props;
  const { getFieldDecorator, getFieldsError } = form;

  /* 
  This function is used to check if form has errors
*/
  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const resultCallback = (name, result) => {
    if (result) {
      message.success(`Parâmetro ${name} adicionado com sucesso`);
      handleCancel();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      onSubmit(values, resultCallback);
    });
  };

  return (
    <Modal
      visible={visible}
      title='Novo Parâmetro'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
    >
      <Form layout='vertical' onSubmit={handleSubmit}>
        <Form.Item label='Nome: '>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: ' ' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Tipo: '>
          {getFieldDecorator('type', {
            rules: [{ required: true, message: ' ' }],
          })(
            <Select>
              <Option value='float'>Float</Option>
              <Option value='int'>Int</Option>
              <Option value='string'>String</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='Valor padrão: '>
          {getFieldDecorator('defaultValue')(<Input />)}
        </Form.Item>
        <Form.Item label='Detalhes: '>
          {getFieldDecorator('details')(<TextArea />)}
        </Form.Item>
        <Form.Item label='Obrigatório: '>
          {getFieldDecorator('required', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewParameterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form.create({ name: 'new-parameter' })(NewParameterModal);
