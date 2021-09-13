import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { Input, PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceSearchHeader = ({ handleGoBack }) => {
  return (
    <PageHeader
      className='marketplace-search-header'
      onBack={handleGoBack}
      extra={
        <>
          <Input
            className='marketplace-search-header-search'
            placeholder='Buscar no marketplace'
            suffix={<SearchOutlined />}
          />

          <AccountInfo />
        </>
      }
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
