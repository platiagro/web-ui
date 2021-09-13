import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { Input, PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceAuthorHeader = ({ handleGoBack, author }) => {
  return (
    <PageHeader
      className='marketplace-author-header'
      onBack={handleGoBack}
      extra={
        <>
          <Input
            className='marketplace-author-header-search'
            placeholder='Buscar no marketplace'
            suffix={<SearchOutlined />}
          />

          <AccountInfo />
        </>
      }
      title={
        <>
          <span className='marketplace-author-header-subtitle'>
            Autor de Soluções
          </span>

          <Typography.Title level={3} ellipsis>
            {author.name}
          </Typography.Title>
        </>
      }
    />
  );
};

MarketplaceAuthorHeader.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  author: PropTypes.object,
};

MarketplaceAuthorHeader.defaultProps = {
  author: {},
};

export default MarketplaceAuthorHeader;
