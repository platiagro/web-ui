import React from 'react';

import PropTypes from 'prop-types';

import { Modal, Form, Input, Select, Switch } from 'antd';

const { Option } = Select;

const { TextArea } = Input;

/* 
  This function is used to check if form has errors
*/
const hasErrors = (fieldsError) => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

// eslint-disable-next-line
class NewParameterModal extends React.Component {
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
        title='Novo Parâmetro'
        okText='Criar'
        cancelText='Cancelar'
        onCancel={onCancel}
        onOk={onCreate}
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
  }
}

NewParameterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'new-parameter' })(NewParameterModal);
