import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceTaskDetailsHeader = ({ handleGoBack }) => {
  return (
    <PageHeader
      className='marketplace-task-details-header'
      extra={<AccountInfo />}
      onBack={handleGoBack}
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
