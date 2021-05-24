import React from 'react';
import { useHistory } from 'react-router';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

import './TaskDetails.style.less';

const TaskDetails = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
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
          <div className='task-details-page-content-form'></div>
          <div className='task-details-page-content-info'>
            <div className='task-details-page-content-info-notebook'></div>
            <div className='task-details-page-content-info-uploads'></div>
            <div className='task-details-page-content-info-task-creator'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
