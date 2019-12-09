/**
 * Component responsible for:
 * - Structuring the advanced new component parameter layout
 * - Add parameter
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, message, Modal, Select, Switch } from 'antd';
import { addParam } from '../../../store/actions/componentActions';

const { Option } = Select;
const { TextArea } = Input;

const NewParameterModal = (props) => {
  const { details, form, visible, onCancel, onAddParam } = props;
  const { uuid, parameters } = details;
  const { getFieldDecorator, getFieldsError } = form;

  /**
   * Function used to check if form has errors
   * @param {string[]} fieldsError
   */
  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  /**
   * Function to handle modal cancel
   */
  const handleCancel = () => {
    form.resetFields();
    onCancel();
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
          default: values.defaultValue,
          details: values.details,
        };

        onAddParam(uuid, parameters, newParameter).then((response) => {
          if (response) {
            message.success(
              `Parâmetro ${newParameter.name} adicionado com sucesso`
            );
            handleCancel();
          }
        });
      }
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
      <Form layout='vertical'>
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
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
  }).isRequired,
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
)(Form.create({ name: 'new-parameter-modal' })(NewParameterModal));
