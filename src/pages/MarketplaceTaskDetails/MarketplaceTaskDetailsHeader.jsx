import React from 'react';
import PropTypes from 'prop-types';
import { Input, PageHeader, Typography } from 'antd';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

import { useBooleanState, useDebounce } from 'hooks';
import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceTaskDetailsHeader = ({ handleGoBack, handleSearch }) => {
  const [isSearching, handleStartSearching, handleStopSearching] =
    useBooleanState();

  const handleChangeText = useDebounce({
    delay: 1000,
    startCallback() {
      handleStartSearching();
    },
    stopCallback(text) {
      handleStopSearching();
      const search = text?.trim();
      if (search) handleSearch(search);
    },
  });

  return (
    <PageHeader
      className='marketplace-task-details-header'
      onBack={handleGoBack}
      extra={
        <>
          <Input
            placeholder='Buscar no marketplace'
            className='marketplace-task-details-header-search'
            onChange={(e) => handleChangeText(e.target.value)}
            suffix={isSearching ? <LoadingOutlined /> : <SearchOutlined />}
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
  handleSearch: PropTypes.func.isRequired,
};

export default MarketplaceTaskDetailsHeader;
