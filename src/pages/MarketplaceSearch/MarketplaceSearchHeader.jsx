import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, PageHeader, Typography } from 'antd';
import {
  ClearOutlined,
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { useBooleanState, useDebounce } from 'hooks';
import AccountInfo from 'components/ContentHeader/AccountInfo';

const MarketplaceSearchHeader = ({
  searchText,
  handleGoBack,
  handleChangeSearchText,
}) => {
  const [internalSearch, setInternalSearch] = useState(searchText || '');

  const [isSearching, handleStartSearching, handleStopSearching] =
    useBooleanState();

  const handleChangeSearch = useDebounce({
    delay: 1000,
    startCallback(value) {
      setInternalSearch(value);
      handleStartSearching();
    },
    stopCallback(value) {
      handleStopSearching();
      handleChangeSearchText(value);
    },
  });

  const handleClearSearchText = () => {
    setInternalSearch('');
    handleChangeSearchText('');
  };

  const renderSearchInputSuffix = () => {
    if (isSearching) {
      return <LoadingOutlined />;
    } else if (internalSearch.trim()) {
      return (
        <Button
          size='small'
          shape='circle-outline'
          onClick={handleClearSearchText}
        >
          <ClearOutlined />
        </Button>
      );
    }

    return <SearchOutlined />;
  };

  // Update internal state when clear all filters
  useEffect(() => {
    if (!isSearching && searchText !== internalSearch) {
      setInternalSearch(searchText);
    }
  }, [internalSearch, isSearching, searchText]);

  return (
    <PageHeader
      className='marketplace-search-header'
      onBack={handleGoBack}
      extra={
        <>
          <Input
            value={internalSearch}
            suffix={renderSearchInputSuffix()}
            placeholder='Buscar no marketplace'
            className='marketplace-search-header-search'
            onChange={(e) => handleChangeSearch(e.target.value)}
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
  searchText: PropTypes.string,
  handleGoBack: PropTypes.func,
  handleChangeSearchText: PropTypes.func,
};

MarketplaceSearchHeader.defaultProps = {
  searchText: '',
  handleGoBack: null,
  handleChangeSearchText: null,
};

export default MarketplaceSearchHeader;
