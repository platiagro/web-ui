import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { Input, PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceTaskDetailsHeader = ({ handleGoBack }) => {
  return (
    <PageHeader
      className='marketplace-task-details-header'
      onBack={handleGoBack}
      extra={
        <>
          <Input
            className='marketplace-task-details-header-search'
            placeholder='Buscar no marketplace'
            suffix={<SearchOutlined />}
          />

          <AccountInfo />
        </>
      }
      title={
        <>
          <span className='marketplace-task-details-header-subtitle'>
            Soluções no Marketplace
          </span>

          <Typography.Title level={3} ellipsis>
            Detalhes da Tarefa
          </Typography.Title>
        </>
      }
    />
  );
};

MarketplaceTaskDetailsHeader.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
};

export default MarketplaceTaskDetailsHeader;
