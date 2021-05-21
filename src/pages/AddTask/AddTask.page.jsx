import React from 'react';
import { useHistory } from 'react-router';
import { ShoppingOutlined } from '@ant-design/icons';
import { PageHeader, Typography, Button } from 'antd';

import { ReactComponent as MarketPlaceIcon } from 'assets/marketplace.svg';
import AccountInfo from 'components/ContentHeader/AccountInfo';

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
          <div className='add-task-page-content-panels-left'></div>

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
