import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Upload } from 'antd';
import {
  ToolOutlined,
  UploadOutlined,
  LoadingOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';

const TaskDetailsNotebooks = ({
  isUploadingDeploymentNotebook,
  isUploadingExperimentNotebook,
  handleShowNotebooksModal,
  handleOpenDeploymentNotebook,
  handleOpenExperimentNotebook,
  handleUploadDeploymentNotebook,
  handleUploadExperimentNotebook,
}) => {
  const handleExperimentNotebookRequest = (data) => {
    if (data.file) handleUploadExperimentNotebook(data.file);
  };

  const handleDeploymentNotebookRequest = (data) => {
    if (data.file) handleUploadDeploymentNotebook(data.file);
  };

  return (
    <div className='task-details-page-content-info-notebook'>
      <div className='task-details-page-content-info-notebook-title'>
        Código-Fonte
      </div>

      <div className='task-details-page-content-info-notebook-text'>
        As tarefas na PlatIAgro têm dois Notebooks Jupyter associados a elas, um
        específico para a etapa de Experimentação e outro para a etapa de
        Pré-implantação, com características próprias para cada cenário.
      </div>

      <Button
        className='task-details-page-content-info-notebook-more'
        onClick={handleShowNotebooksModal}
        type='link'
      >
        <span>Saiba Mais</span>
      </Button>

      <div className='task-details-page-content-info-notebook-buttons'>
        <Button
          onClick={handleOpenExperimentNotebook}
          icon={<ExperimentOutlined />}
          type='default'
          shape='round'
        >
          <span>Notebook de Experimentação</span>
        </Button>

        <Upload
          accept='.ipynb,.py'
          showUploadList={false}
          customRequest={handleExperimentNotebookRequest}
        >
          <Tooltip
            title='Faz upload de um Notebook Jupyter, substituindo o código de experimentação existente'
            placement='rightBottom'
          >
            <Button
              type='default'
              shape='circle'
              icon={
                isUploadingExperimentNotebook ? (
                  <LoadingOutlined style={{ fontSize: '14px' }} />
                ) : (
                  <UploadOutlined />
                )
              }
            />
          </Tooltip>
        </Upload>
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

        <Upload
          accept='.ipynb,.py'
          showUploadList={false}
          customRequest={handleDeploymentNotebookRequest}
        >
          <Tooltip
            title='Faz upload de um Notebook Jupyter, substituindo o código de pré-implantação existente'
            placement='rightBottom'
          >
            <Button
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
        </Upload>
      </div>
    </div>
  );
};

TaskDetailsNotebooks.propTypes = {
  isUploadingDeploymentNotebook: PropTypes.bool.isRequired,
  isUploadingExperimentNotebook: PropTypes.bool.isRequired,
  handleShowNotebooksModal: PropTypes.func.isRequired,
  handleOpenDeploymentNotebook: PropTypes.func.isRequired,
  handleOpenExperimentNotebook: PropTypes.func.isRequired,
  handleUploadDeploymentNotebook: PropTypes.func.isRequired,
  handleUploadExperimentNotebook: PropTypes.func.isRequired,
};

export default TaskDetailsNotebooks;
