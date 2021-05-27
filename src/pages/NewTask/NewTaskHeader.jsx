import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const NewTaskHeader = ({ handleGoBack }) => {
  return (
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
  );
};

NewTaskHeader.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
};

export default NewTaskHeader;
