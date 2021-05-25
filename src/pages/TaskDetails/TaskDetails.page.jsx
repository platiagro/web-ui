import React from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Typography, Button, Avatar } from 'antd';
import {
  ToolOutlined,
  UploadOutlined,
  ExperimentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

import AccountInfo from 'components/ContentHeader/AccountInfo';

import './TaskDetails.style.less';
import { Placeholder } from 'components';

const TaskDetails = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleUploadExperimentationNotebook = () => {};
  const handleOpenExperimentationNotebook = () => {};

  const handleOpenDeploymentNotebook = () => {};
  const handleUploadDeploymentNotebook = () => {};

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
          <div className='task-details-page-content-form'></div>

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
                  Notebook de Experimentação
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
                  Notebook de Pré-implantação
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
