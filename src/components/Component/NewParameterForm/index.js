/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import NewParameterModal from '../NewParameterModal';

const { Option } = Select;

const NewParameterForm = (props) => {
  const { form, onSubmit } = props;
  const { getFieldDecorator } = form;
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const showModal = () => {
    setModalIsVisible(true);
  };

  const hideModal = () => {
    setModalIsVisible(false);
  };

  const resultCallback = (name, result) => {
    if (result) {
      message.success(`Parâmetro ${name} adicionado com sucesso`);
      props.form.resetFields();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values, resultCallback);
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item style={{ marginBottom: 0, maxHeight: '32px' }}>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 30px)' }}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: ' ' }],
          })(<Input placeholder='Nome' />)}
        </Form.Item>
        <span
          style={{
            display: 'inline-block',
            width: '24px',
            textAlign: 'center',
          }}
        >
          {' '}
        </span>
        <Form.Item
          style={{ display: 'inline-block', width: 'calc(50% - 30px)' }}
        >
          {getFieldDecorator('type', {
            rules: [{ required: true, message: ' ' }],
          })(
            <Select placeholder='Tipo'>
              <Option value='float'>Float</Option>
              <Option value='int'>Int</Option>
              <Option value='string'>String</Option>
            </Select>
          )}
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <NewParameterModal
          visible={modalIsVisible}
          onCancel={hideModal}
          onSubmit={onSubmit}
        />
        <a href='#' onClick={showModal}>
          Avançado
        </a>
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('required', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Switch />)}
        <span> Obrigatório</span>
      </Form.Item>
      <Button type='primary' htmlType='submit' className='login-form-button'>
        Adicionar parâmetro
      </Button>
    </Form>
  );
};

NewParameterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'new_parameter' })(NewParameterForm);
