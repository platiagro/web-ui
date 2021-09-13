import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getMarketplaceTasks, MARKETPLACE_TYPES } from 'store/marketplace';
import { useIsLoading, usePersistentState } from 'hooks';

import MarketplaceSearchHeader from './MarketplaceSearchHeader';
import MarketplaceSearchFilters from './MarketplaceSearchFilters';
import MarketplaceSearchResults from './MarketplaceSearchResults';
import {
  MARKETPLACE_LIST_TYPE,
  MARKETPLACE_LIST_ORDER,
  MARKETPLACE_LOCAL_STORAGE_KEYS,
} from './MarketplaceSearchConfigs';

import './MarketplaceSearch.style.less';

const MarketplaceSearch = () => {
  const history = useHistory();

  const tasks = useSelector(getMarketplaceTasks);
  const isSearchingTasks = useIsLoading(MARKETPLACE_TYPES.FETCH_TASKS);

  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(history.location.search);
    const paramsObject = {};

    searchParams.forEach((value, key) => {
      if (key === 'tags') {
        const values = value.split(',');
        const tagSet = new Set(values);
        tagSet.delete(''); // Remove empty string
        paramsObject.tags = Array.from(tagSet);
        return;
      }

      paramsObject[key] = value === 'true'; // The value is a string
    });

    return paramsObject;
  });

  const [listType, setListType] = usePersistentState({
    key: MARKETPLACE_LOCAL_STORAGE_KEYS.MARKETPLACE_LIST_TYPE,
    defaultValue: MARKETPLACE_LIST_TYPE.GRID,
  });

  const [listOrder, setListOrder] = usePersistentState({
    key: MARKETPLACE_LOCAL_STORAGE_KEYS.MARKETPLACE_LIST_ORDER,
    defaultValue: MARKETPLACE_LIST_ORDER.NEWER,
  });

  const handleGoBack = () => {
    history.goBack();
  };

  const handleChangeCategoryFilters = (categoryKey, isChecked) => {
    const filtersClone = { ...filters };
    if (isChecked) filtersClone[categoryKey] = isChecked;
    else delete filtersClone[categoryKey];

    const filterKeys = Object.keys(filtersClone);
    const isFiltersEmpty = filterKeys.length === 0;
    const filtersHasOneAttr = filterKeys.length === 1;
    const filterHasOnlyTags = filtersHasOneAttr && filterKeys[0] === 'tags';

    if (isFiltersEmpty || filterHasOnlyTags) {
      delete filtersClone.tags;
    }

    history.push({
      pathname: history.location.pathname,
      search: `?${new URLSearchParams(filtersClone)}`,
    });

    setFilters(filtersClone);
  };

  const handleChangeTagFilters = (tag, isChecked) => {
    const filtersClone = { ...filters };

    const tagSet = new Set(filtersClone.tags);
    if (isChecked) tagSet.delete(tag);
    else tagSet.add(tag);

    filtersClone.tags = Array.from(tagSet);

    if (filtersClone.tags.length === 0) {
      delete filtersClone.tags;
    }

    history.push({
      pathname: history.location.pathname,
      search: `?${new URLSearchParams(filtersClone)}`,
    });

    setFilters(filtersClone);
  };

  const handleClearFilters = () => {
    setFilters({});
    history.push({
      pathname: history.location.pathname,
      search: '',
    });
  };

  const handleChangeListType = () => {
    setListType((currentListType) =>
      currentListType === MARKETPLACE_LIST_TYPE.GRID
        ? MARKETPLACE_LIST_TYPE.LIST
        : MARKETPLACE_LIST_TYPE.GRID
    );
  };

  return (
    <div className='marketplace-search'>
      <MarketplaceSearchHeader handleGoBack={handleGoBack} />

      <div className='marketplace-search-content'>
        <MarketplaceSearchFilters
          filters={filters}
          handleClearFilters={handleClearFilters}
          handleChangeTagFilters={handleChangeTagFilters}
          handleChangeCategoryFilters={handleChangeCategoryFilters}
        />

        <MarketplaceSearchResults
          tasks={tasks}
          listType={listType}
          listOrder={listOrder}
          isSearchingTasks={isSearchingTasks}
          handleChangeListOrder={setListOrder}
          handleChangeListType={handleChangeListType}
        />
      </div>
    </div>
  );
};

export default MarketplaceSearch;
