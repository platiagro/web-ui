/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import PropTypes from 'prop-types';

import { Button, Form, Input, Select, Switch } from 'antd';

import NewParameterModal from '../NewParameterModal';

const { Option } = Select;

// eslint-disable-next-line
class NewParameterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsVisible: false,
    };
  }

  componentDidUpdate() {
    const { result, onUpdateComponentParamsReset } = this.props;
    const { modalIsVisible } = this.state;

    if (result) {
      onUpdateComponentParamsReset();
      if (modalIsVisible) {
        this.hideModal();
      } else {
        this.props.form.resetFields();
      }
    }
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  showModal = () => {
    this.setState({ modalIsVisible: true });
  };

  hideModal = () => {
    const { form } = this.formRef.props;

    this.setState({ modalIsVisible: false });

    form.resetFields();
  };

  render() {
    const { onSubmit } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { modalIsVisible } = this.state;

    const handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          onSubmit(values);
        }
      });
    };

    const handleCreateAdvancedParameter = () => {
      const { form } = this.formRef.props;
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        onSubmit(values);
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
            wrappedComponentRef={this.saveFormRef}
            visible={modalIsVisible}
            onCancel={this.hideModal}
            onCreate={handleCreateAdvancedParameter}
          />
          <a href='#' onClick={this.showModal}>
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
