// FIXME: tecla enter não está enviando formulário
/**
 * Component responsible for:
 * - Structuring the add project form layout
 * - Add new project
 */

import React from 'react';

import { Modal, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  addProject,
  toggleModal,
} from '../../../store/actions/projectsActions';

const NewProjectModal = (props) => {
  const { modalIsVisible, form } = props;
  const { onAddProject, onToggleModal } = props;
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
      onAddProject(values.name, history);
    });
  };

  return (
    <Modal
      visible={modalIsVisible}
      title='Novo Projeto'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
    >
      <Form layout='vertical'>
        <Form.Item label='Qual o nome do seu projeto?'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o projeto!',
              },
            ],
            initialValue: 'Novo Projeto',
          })(<Input allowClear autoFocus />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    modalIsVisible: state.projects.modalIsVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddProject: (name, history) => {
      dispatch(addProject(name, history));
    },
    onToggleModal: () => {
      dispatch(toggleModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: 'new-project' })(NewProjectModal));
