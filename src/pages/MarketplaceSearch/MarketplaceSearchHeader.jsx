import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceSearchHeader = ({ handleGoBack }) => {
  return (
    <PageHeader
      className='marketplace-search-header'
      extra={<AccountInfo />}
      onBack={handleGoBack}
      title={
        <>
          <span className='marketplace-search-header-subtitle'>
            Marketplace
          </span>

          <Typography.Title level={3} ellipsis>
            Soluções no Marketplace
          </Typography.Title>
        </>
      }
    />
  );
};

MarketplaceSearchHeader.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
};

export default MarketplaceSearchHeader;
