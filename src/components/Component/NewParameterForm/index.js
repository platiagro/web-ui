/* eslint-disable react/destructuring-assignment */
import React from 'react';

import PropTypes from 'prop-types';

import { Form, Input, Button, Select, Switch } from 'antd';

const { Option } = Select;

// eslint-disable-next-line
class NewParameterForm extends React.Component {
  render() {
    const { onSubmit } = this.props;
    const { getFieldDecorator } = this.props.form;

    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Please input your username!' },
              ],
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
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            {getFieldDecorator('type', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Select placeholder='Tipo'>
                <Option value='float'>Float</Option>
                <Option value='int'>Int</Option>
                <Option value='string'>String</Option>
              </Select>
            )}
          </Form.Item>
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
  }
}

NewParameterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
};

export default Form.create({ name: 'new_parameter' })(NewParameterForm);
