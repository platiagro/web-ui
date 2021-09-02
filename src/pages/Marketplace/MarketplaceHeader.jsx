import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceHeader = ({ handleGoBack }) => {
  return (
    <PageHeader
      className='marketplace-header'
      extra={<AccountInfo />}
      onBack={handleGoBack}
      title={
        <>
          <span className='marketplace-header-subtitle'>
            Encontre Soluções Para Seus Fluxos
          </span>

          <Typography.Title level={3} ellipsis>
            Marketplace
          </Typography.Title>
        </>
      }
    />
  );
};

MarketplaceHeader.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
};

export default MarketplaceHeader;
