/**
 * Component responsible for:
 * - Structuring the basic new component parameter layout
 * - Add parameter
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, message, Select, Switch } from 'antd';
import NewParameterModal from '../NewParameterModal';
import { addParam } from '../../../store/actions/componentActions';

const { Option } = Select;

const NewParameterForm = (props) => {
  const { details, form, onAddParam } = props;
  const { uuid, parameters } = details;
  const { getFieldDecorator } = form;
  const [modalIsVisible, setModalIsVisible] = useState(false);

  /**
   * Function to toggle modal visibility
   */
  const toggleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  /**
   * Function to handle form submit
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const newParameter = {
          name: values.name,
          type: values.type,
          required: values.required,
        };

        onAddParam(uuid, parameters, newParameter).then((response) => {
          if (response) {
            message.success(
              `Parâmetro ${newParameter.name} adicionado com sucesso`
            );
            form.resetFields();
          }
        });
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
          onCancel={toggleModal}
          onSubmit={handleSubmit}
        />
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <a href='#' onClick={toggleModal}>
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

const mapStateToProps = (state) => {
  return {
    details: state.component.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddParam: (id, parameters, newParameter) => {
      return dispatch(addParam(id, parameters, newParameter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'new_parameter' })(NewParameterForm));
