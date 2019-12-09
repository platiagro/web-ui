/**
 * Component responsible for:
 * - Structuring the add component form layout
 * - Add new component
 */
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal, Form, Input } from 'antd';
import {
  addComponent,
  toggleModal,
} from '../../../store/actions/componentsActions';

const NewComponentModal = (props) => {
  const { modalIsVisible, form } = props;
  const { onAddComponent, onToggleModal } = props;
  const { getFieldDecorator, getFieldsError } = form;
  const history = useHistory();

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
    onToggleModal();
  };

  /**
   * Function to handle form submit
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      onAddComponent(values.name, history);
    });
  };

  return (
    <Modal
      visible={modalIsVisible}
      title='Novo Componente'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCancel}
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

const mapStateToProps = (state) => {
  return {
    modalIsVisible: state.components.modalIsVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddComponent: (post, history) => {
      dispatch(addComponent(post, history));
    },
    onToggleModal: () => {
      dispatch(toggleModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'new-component' })(NewComponentModal));
