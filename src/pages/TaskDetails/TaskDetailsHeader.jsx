import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import {
  PageHeader,
  Typography,
  Button,
  Input,
  Tooltip,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  LoadingOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const TaskDetailsHeader = ({
  isEditingTask,
  handleDeleteTask,
  hasEditedSomething,
  handleEditTaskName,
  handleShowShareTaskModal,
}) => {
  const history = useHistory();

  const taskNameRef = useRef(null);

  const [isEditingTaskName, setIsEditingTaskName] = useState(false);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleStartEditingTaskName = () => {
    setIsEditingTaskName(true);
    setTimeout(() => {
      // Callbacks go to the end of execution stack
      // That's why this works before the next render
      if (taskNameRef.current) taskNameRef.current.focus();
    }, 0);
  };

  const handleCancelTaskNameEditing = () => {
    setIsEditingTaskName(false);
  };

  const getValues = () => {
    const taskName = taskNameRef.current?.state?.value || '';
    return { taskName };
  };

  const handleValidation = () => {
    const { taskName } = getValues();
    if (taskName.trim()) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { taskName } = getValues();
      handleEditTaskName(taskName);
    }
  };

  return (
    <PageHeader
      className='task-details-page-header'
      onBack={handleGoBack}
      title={
        <>
          <span className='task-details-page-header-subtitle'>Tarefas</span>

          {isEditingTaskName ? (
            <form
              className='task-details-page-header-edit-name'
              onSubmit={handleSubmit}
              noValidate
            >
              <Input
                ref={taskNameRef}
                className='task-details-page-header-edit-name-input task-details-page-input-style'
                type='text'
                size='middle'
                defaultValue='Tarefa em Branco'
                placeholder='Escreva um nome para a tarefa'
              />

              <Tooltip title='Cancelar Edição' placement='bottom'>
                <Button
                  type='default'
                  shape='circle'
                  icon={<CloseOutlined />}
                  onClick={handleCancelTaskNameEditing}
                />
              </Tooltip>

              <Tooltip title='Salvar' placement='bottom'>
                <Button
                  type='default'
                  shape='circle'
                  htmlType='submit'
                  icon={<CheckOutlined />}
                />
              </Tooltip>
            </form>
          ) : (
            <Typography.Title level={3} ellipsis>
              <span>Tarefa em Branco</span>

              <Tooltip title='Editar' placement='bottom'>
                <EditOutlined
                  className='task-details-page-header-edit-icon'
                  onClick={handleStartEditingTaskName}
                  type='edit'
                />
              </Tooltip>
            </Typography.Title>
          )}
        </>
      }
      extra={
        <>
          {isEditingTask && (
            <div className='task-details-page-header-save-message'>
              <LoadingOutlined />
              <span>Salvando</span>
            </div>
          )}

          {!isEditingTask && hasEditedSomething && (
            <div className='task-details-page-header-save-message'>
              <CheckCircleOutlined />
              <span>As Alterações Foram Salvas</span>
            </div>
          )}

          <Button
            className='task-details-page-header-share-button'
            onClick={handleShowShareTaskModal}
            icon={<ShareAltOutlined />}
            type='default'
            shape='round'
          >
            Compartilhar
          </Button>

          <Tooltip placement='bottom' title={'Excluir Tarefa'}>
            <Popconfirm
              title='Tem certeza que deseja excluir a tarefa?'
              onConfirm={handleDeleteTask}
              cancelText='Não'
              okText='Sim'
            >
              <Button
                className='task-details-page-header-delete-button'
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
          <AccountInfo />
        </>
      }
    />
  );
};

TaskDetailsHeader.propTypes = {
  isEditingTask: PropTypes.bool.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  hasEditedSomething: PropTypes.func.isRequired,
  handleEditTaskName: PropTypes.func.isRequired,
  handleShowShareTaskModal: PropTypes.func.isRequired,
};

export default TaskDetailsHeader;
