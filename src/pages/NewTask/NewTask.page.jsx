import React from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Typography, Button, Tooltip } from 'antd';
import {
  CodeTwoTone,
  LayoutTwoTone,
  ShoppingOutlined,
} from '@ant-design/icons';

import { TaskTemplateItem } from 'components';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import { ReactComponent as DockerIcon } from 'assets/dockerIcon.svg';
import { ReactComponent as MarketPlaceIcon } from 'assets/marketplace.svg';

import './NewTask.style.less';

const NewTask = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoToMarketPlace = () => {
    history.push('/marketplace');
  };

  const handleCreateBlankTask = () => {
    history.push('/tarefa/0');
  };

  const handleCreateDockerTask = () => {
    history.push('/tarefa/0');
  };

  return (
    <div className='new-task-page'>
      <PageHeader
        className='new-task-page-header'
        extra={<AccountInfo />}
        onBack={handleGoBack}
        title={
          <>
            <span className='new-task-page-header-subtitle'>Tarefas</span>
            <Typography.Title level={3} ellipsis>
              Nova Tarefa
            </Typography.Title>
          </>
        }
      />

      <div className='new-task-page-content'>
        <div className='new-task-page-content-panels'>
          <div className='new-task-page-content-panels-left'>
            <div className='new-task-page-content-panels-left-title'>
              <CodeTwoTone twoToneColor='#a9a9a9' />
              <span>Faça Você Mesmo(a)</span>
            </div>

            <div className='new-task-page-content-panels-left-list'>
              <Tooltip
                color='black'
                placement='right'
                title='Crie a tarefa a partir de um template contendo a estrutura necessária para funcionamento na PlatIAgro ou faça upload do seu Notebook Jupyter.'
              >
                <TaskTemplateItem
                  className='new-task-page-content-panels-left-item'
                  handleClickButton={handleCreateBlankTask}
                  buttonText='Criar Tarefa'
                  title='Em Branco'
                  description='Crie a tarefa a partir de um template contendo a estrutura necessária para funcionamento na PlatIAgro ou faça upload do seu Notebook Jupyter.'
                />
              </Tooltip>

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                handleClickButton={handleCreateDockerTask}
                titleComponent={<DockerIcon />}
                buttonText='Criar Tarefa'
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
              />
            </div>

            <div className='new-task-page-content-panels-left-title'>
              <LayoutTwoTone twoToneColor='#a9a9a9' />
              <span>Comece Por Um Exemplo</span>
            </div>

            <div className='new-task-page-content-panels-left-category'>
              Nome da Categoria
            </div>

            <div className='new-task-page-content-panels-left-type'>
              Genérico
            </div>

            <div className='new-task-page-content-panels-left-list'>
              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />
            </div>

            <div className='new-task-page-content-panels-left-type'>
              Especializado
            </div>

            <div className='new-task-page-content-panels-left-list'>
              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='new-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />
            </div>
          </div>

          <div className='new-task-page-content-panels-right'>
            <div className='new-task-page-content-panels-right-title'>
              Você também pode encontrar o que precisa no Marketplace
            </div>

            <MarketPlaceIcon />

            <Button
              className='new-task-page-content-panels-right-button'
              onClick={handleGoToMarketPlace}
              icon={<ShoppingOutlined />}
              shape='round'
            >
              Ir Para o Marketplace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
