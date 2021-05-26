import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import {
  PageHeader,
  Typography,
  Button,
  Avatar,
  Input,
  Select,
  Tooltip,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  ToolOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  UploadOutlined,
  LoadingOutlined,
  ShareAltOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { Placeholder } from 'components';
import AccountInfo from 'components/ContentHeader/AccountInfo';

import './TaskDetails.style.less';
import { useIsLoading } from 'hooks';

const TaskDetails = () => {
  const history = useHistory();

  const taskNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const inputDataRef = useRef(null);
  const outputDataRef = useRef(null);
  const searchTagsRef = useRef(null);
  const documentationRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState();
  const [hasEditedSomething, setHasEditedSomething] = useState(false);

  const [isEditingTaskName, setIsEditingTaskName] = useState(false);

  const isUploadingExperimentationNotebook = useIsLoading('uploading');
  const isUploadingDeploymentNotebook = useIsLoading('uploading');
  const isEditingTask = useIsLoading('editing');

  const handleGoBack = () => {
    history.goBack();
  };

  const handleUploadExperimentationNotebook = () => {};

  const handleOpenExperimentationNotebook = () => {};

  const handleOpenDeploymentNotebook = () => {};

  const handleUploadDeploymentNotebook = () => {};

  const handleDeleteTask = () => {};

  const handleShareTask = () => {};

  const handleEditTaskName = () => {};

  const handleStartEditingTaskName = () => {
    setIsEditingTaskName(true);
  };

  const handleCancelTaskNameEditing = () => {
    setIsEditingTaskName(false);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasEditedSomething(true);
  };

  return (
    <div className='task-details-page'>
      <PageHeader
        className='task-details-page-header'
        onBack={handleGoBack}
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
              icon={<ShareAltOutlined />}
              onClick={handleShareTask}
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
        title={
          <>
            <span className='task-details-page-header-subtitle'>Tarefas</span>

            {isEditingTaskName ? (
              <div className='task-details-page-header-edit-name'>
                <Input
                  className='task-details-page-header-edit-name-input'
                  ref={taskNameRef}
                  type='text'
                  size='middle'
                  defaultValue='Tarefa em Branco'
                  placeholder='Escreva um nome para a tarefa'
                />

                <div className='task-details-page-header-edit-name-actions'>
                  <Tooltip title='Cancelar Edição' placement='bottom'>
                    <CloseOutlined onClick={handleCancelTaskNameEditing} />
                  </Tooltip>

                  <Tooltip title='Salvar' placement='bottom'>
                    <CheckOutlined onClick={handleEditTaskName} />
                  </Tooltip>
                </div>
              </div>
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
      />

      <div className='task-details-page-content'>
        <div className='task-details-page-content-panels'>
          <form
            className='task-details-page-content-form'
            onSubmit={handleSubmit}
            noValidate
          >
            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='description'
              >
                Descrição
              </label>

              <Input
                className='task-details-page-content-form-field-input'
                ref={descriptionRef}
                type='text'
                size='large'
                id='description'
                placeholder='Adicionar Descrição'
              />
            </div>

            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='category'
              >
                Categoria
              </label>

              <Select
                className='task-details-page-content-form-field-input'
                id='category'
                size='large'
                value={selectedCategory}
                onChange={handleSelectCategory}
                placeholder='Selecionar Categoria'
              >
                <Select.Option value='1'>Category 1</Select.Option>
                <Select.Option value='2'>Category 2</Select.Option>
                <Select.Option value='3'>Category 3</Select.Option>
                <Select.Option value='4'>Category 4</Select.Option>
                <Select.Option value='5'>Category 5</Select.Option>
              </Select>
            </div>

            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='inputData'
              >
                <span>Dados de Entrada</span>

                <Tooltip
                  title='Descrição dos dados de entrada da tarefa. Exemplo: “Arquivo .csv com dados tabulares (um atributo por coluna), sem cabeçalho”'
                  placement='right'
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </label>

              <Input
                className='task-details-page-content-form-field-input'
                ref={inputDataRef}
                type='text'
                size='large'
                id='inputData'
                placeholder='Adicionar dados de entrada'
              />
            </div>

            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='outputData'
              >
                <span>Dados de Saída</span>
                <Tooltip
                  title='Descrição dos dados de saída da tarefa. Exemplo: “Conjunto de dados em formato de matriz, com uma amostra por linha”'
                  placement='right'
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </label>

              <Input
                className='task-details-page-content-form-field-input'
                ref={outputDataRef}
                type='text'
                size='large'
                id='outputData'
                placeholder='Adicionar dados de saída'
              />
            </div>

            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='searchTags'
              >
                <span>Tags de Busca</span>

                <Tooltip
                  title='As tags facilitam a busca de tarefas. Escolha palavras-chave e adicione as tags usando vírgulas para separá-las.'
                  placement='right'
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </label>

              <Input
                className='task-details-page-content-form-field-input'
                ref={searchTagsRef}
                type='text'
                size='large'
                id='searchTags'
                placeholder='Adicionar tags de busca'
              />
            </div>

            <div className='task-details-page-content-form-field'>
              <label
                className='task-details-page-content-form-field-label'
                htmlFor='documentation'
              >
                Documentação
              </label>

              <Input
                className='task-details-page-content-form-field-input'
                ref={documentationRef}
                type='text'
                size='large'
                id='documentation'
                placeholder='Adicionar documentação'
              />
            </div>
          </form>

          <div className='task-details-page-content-info'>
            <div className='task-details-page-content-info-notebook'>
              <div className='task-details-page-content-info-notebook-title'>
                Código-Fonte
              </div>

              <div className='task-details-page-content-info-notebook-text'>
                As tarefas na PlatIAgro têm dois Notebooks Jupyter associados a
                elas, um específico para a etapa de Experimentação e outro para
                a etapa de Pré-implantação, com características próprias para
                cada cenário.
              </div>

              <Button
                type='link'
                className='task-details-page-content-info-notebook-more'
              >
                <span>Saiba Mais</span>
              </Button>

              <div className='task-details-page-content-info-notebook-buttons'>
                <Button
                  onClick={handleOpenExperimentationNotebook}
                  icon={<ExperimentOutlined />}
                  type='default'
                  shape='round'
                >
                  <span>Notebook de Experimentação</span>
                </Button>

                <Tooltip
                  title='Faz upload de um Notebook Jupyter, substituindo o código de experimentação existente'
                  placement='rightBottom'
                >
                  <Button
                    onClick={handleUploadExperimentationNotebook}
                    type='default'
                    shape='circle'
                    icon={
                      isUploadingExperimentationNotebook ? (
                        <LoadingOutlined style={{ fontSize: '14px' }} />
                      ) : (
                        <UploadOutlined />
                      )
                    }
                  />
                </Tooltip>
              </div>

              <div className='task-details-page-content-info-notebook-buttons'>
                <Button
                  onClick={handleOpenDeploymentNotebook}
                  icon={<ToolOutlined />}
                  type='default'
                  shape='round'
                >
                  <span>Notebook de Pré-implantação</span>
                </Button>

                <Tooltip
                  title='Faz upload de um Notebook Jupyter, substituindo o código de pré-implantação existente'
                  placement='rightBottom'
                >
                  <Button
                    onClick={handleUploadDeploymentNotebook}
                    type='default'
                    shape='circle'
                    icon={
                      isUploadingDeploymentNotebook ? (
                        <LoadingOutlined style={{ fontSize: '14px' }} />
                      ) : (
                        <UploadOutlined />
                      )
                    }
                  />
                </Tooltip>
              </div>
            </div>
            <div className='task-details-page-content-info-uploads'>
              <div className='task-details-page-content-info-uploads-title'>
                <ClockCircleOutlined />
                <span>Uploads Recentes</span>
              </div>

              <Placeholder
                iconComponent={<ClockCircleOutlined />}
                message='Nenhum Upload Foi Realizado'
              />
            </div>

            <div className='task-details-page-content-info-footer'>
              <div className='task-details-page-content-info-footer-task-creator'>
                <Avatar>UA</Avatar>
                <span>Usuário Anônimo</span>
              </div>

              <div className='task-details-page-content-info-footer-task-modified'>
                Modificada
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
