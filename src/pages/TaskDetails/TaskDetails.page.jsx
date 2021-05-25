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
} from 'antd';
import {
  ToolOutlined,
  UploadOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import AccountInfo from 'components/ContentHeader/AccountInfo';

import './TaskDetails.style.less';
import { Placeholder } from 'components';

const TaskDetails = () => {
  const history = useHistory();

  const descriptionRef = useRef(null);
  const inputDataRef = useRef(null);
  const outputDataRef = useRef(null);
  const searchTagsRef = useRef(null);
  const documentationRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleUploadExperimentationNotebook = () => {};
  const handleOpenExperimentationNotebook = () => {};

  const handleOpenDeploymentNotebook = () => {};
  const handleUploadDeploymentNotebook = () => {};

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='task-details-page'>
      <PageHeader
        className='task-details-page-header'
        extra={<AccountInfo />}
        onBack={handleGoBack}
        title={
          <>
            <span className='task-details-page-header-subtitle'>Tarefas</span>
            <Typography.Title level={3} ellipsis>
              Tarefa em Branco
            </Typography.Title>
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

                <Button
                  onClick={handleUploadExperimentationNotebook}
                  icon={<UploadOutlined />}
                  type='default'
                  shape='circle'
                />
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

                <Button
                  onClick={handleUploadDeploymentNotebook}
                  icon={<UploadOutlined />}
                  type='default'
                  shape='circle'
                />
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

            <div className='task-details-page-content-info-task-creator'>
              <Avatar>UA</Avatar>
              <span>Usuário Anônimo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
