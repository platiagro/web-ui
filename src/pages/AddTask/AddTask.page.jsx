import React from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Typography, Button, Tooltip } from 'antd';
import {
  ShoppingOutlined,
  CodeTwoTone,
  LayoutTwoTone,
} from '@ant-design/icons';

import { TaskTemplateItem } from 'components';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import { ReactComponent as MarketPlaceIcon } from 'assets/marketplace.svg';
import { ReactComponent as DockerIcon } from 'assets/dockerIcon.svg';

import './AddTask.style.less';

const AddTask = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoToMarketPlace = () => {
    history.push('/marketplace');
  };

  return (
    <div className='add-task-page'>
      <PageHeader
        className='add-task-page-header'
        extra={<AccountInfo />}
        onBack={handleGoBack}
        title={
          <>
            <span className='add-task-page-header-subtitle'>Tarefas</span>
            <Typography.Title level={3} ellipsis>
              Nova Tarefa
            </Typography.Title>
          </>
        }
      />

      <div className='add-task-page-content'>
        <div className='add-task-page-content-panels'>
          <div className='add-task-page-content-panels-left'>
            <div className='add-task-page-content-panels-left-title'>
              <CodeTwoTone />
              <span>Faça Você Mesmo(a)</span>
            </div>

            <div className='add-task-page-content-panels-left-list'>
              <Tooltip
                color='black'
                placement='right'
                title='Crie a tarefa a partir de um template contendo a estrutura necessária para funcionamento na PlatIAgro ou faça upload do seu Notebook Jupyter.'
              >
                <TaskTemplateItem
                  className='add-task-page-content-panels-left-item'
                  title='Em Branco'
                  description='Crie a tarefa a partir de um template contendo a estrutura necessária para funcionamento na PlatIAgro ou faça upload do seu Notebook Jupyter.'
                  buttonText='Criar Tarefa'
                />
              </Tooltip>

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />
            </div>

            <div className='add-task-page-content-panels-left-title'>
              <LayoutTwoTone />
              <span>Comece Por Um Exemplo</span>
            </div>

            <div className='add-task-page-content-panels-left-category'>
              Nome da Categoria
            </div>

            <div className='add-task-page-content-panels-left-type'>
              Genérico
            </div>

            <div className='add-task-page-content-panels-left-list'>
              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />
            </div>

            <div className='add-task-page-content-panels-left-type'>
              Especializado
            </div>

            <div className='add-task-page-content-panels-left-list'>
              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />

              <TaskTemplateItem
                className='add-task-page-content-panels-left-item'
                titleComponent={<DockerIcon />}
                description='Uma descrição aqui falando que é uma tarefa criado “do zero” utilizando Docker no lugar de Jupyter Notebook.'
                buttonText='Criar Tarefa'
              />
            </div>
          </div>

          <div className='add-task-page-content-panels-right'>
            <div className='add-task-page-content-panels-right-title'>
              Você também pode encontrar o que precisa no Marketplace
            </div>

            <MarketPlaceIcon />

            <Button
              className='add-task-page-content-panels-right-button'
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

export default AddTask;
