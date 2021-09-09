import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Typography } from 'antd';

import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceAuthorHeader = ({ handleGoBack, author }) => {
  return (
    <PageHeader
      className='marketplace-author-header'
      extra={<AccountInfo />}
      onBack={handleGoBack}
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
