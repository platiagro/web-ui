import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isEqual } from 'lodash';

import {
  MARKETPLACE_TYPES,
  getMarketplaceTasks,
  fetchMarketplaceTasks,
} from 'store/marketplace';
import { MARKETPLACE_TASK_CATEGORIES } from 'configs';
import { useIsLoading, usePersistentState } from 'hooks';

import {
  MARKETPLACE_LIST_TYPE,
  MARKETPLACE_LIST_ORDER,
  MARKETPLACE_LOCAL_STORAGE_KEYS,
} from './MarketplaceSearchConfigs';
import MarketplaceSearchHeader from './MarketplaceSearchHeader';
import MarketplaceSearchFilters from './MarketplaceSearchFilters';
import MarketplaceSearchResults from './MarketplaceSearchResults';

import './MarketplaceSearch.style.less';

const MarketplaceSearch = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const lastFilters = useRef({});

  const tagsPerCategory = {};
  const tasks = useSelector(getMarketplaceTasks);
  const isSearchingTasks = useIsLoading(MARKETPLACE_TYPES.FETCH_TASKS);

  const [searchText, setSearchText] = useState(() => {
    const searchParams = new URLSearchParams(history.location.search);
    return searchParams.get('search') || '';
  });

  const [tags, setTags] = useState(() => {
    const searchParams = new URLSearchParams(history.location.search);
    const commaSeparatedTags = searchParams.get('tags');
    if (!commaSeparatedTags) return [];
    const tagArray = commaSeparatedTags.split(',');
    const tagSet = new Set(tagArray); // Remove repeated
    tagArray.delete(''); // Remove empty string
    return Array.from(tagSet);
  });

  const [categories, setCategories] = useState(() => {
    const searchParams = new URLSearchParams(history.location.search);
    const paramsObject = {};
    searchParams.forEach((value, key) => {
      if (MARKETPLACE_TASK_CATEGORIES[key]) {
        paramsObject[key] = value === 'true'; // The value is a string
      }
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
    const categoriesClone = { ...categories };
    if (isChecked) categoriesClone[categoryKey] = isChecked;
    else delete categoriesClone[categoryKey];
    const hasNoCategories = Object.keys(categoriesClone).length === 0;
    if (hasNoCategories) setTags([]);
    setCategories(categoriesClone);
  };

  const handleChangeTagFilters = (tag, isChecked) => {
    const tagsClone = [...tags];
    const tagSet = new Set(tagsClone);
    if (isChecked) tagSet.delete(tag);
    else tagSet.add(tag);
    setTags(Array.from(tagSet));
  };

  const handleClearFilters = () => {
    setSearchText('');
    setCategories({});
    setTags([]);
  };

  const handleChangeListType = () => {
    setListType((currentListType) =>
      currentListType === MARKETPLACE_LIST_TYPE.GRID
        ? MARKETPLACE_LIST_TYPE.LIST
        : MARKETPLACE_LIST_TYPE.GRID
    );
  };

  useEffect(() => {
    let searchParams = {};

    const hasCategories = categories && Object.keys(categories).length > 0;
    const hasSearchText = !!searchText?.trim();
    const hasTags = tags?.length > 0;

    if (hasCategories) searchParams = { ...categories };
    if (hasSearchText) searchParams.search = searchText;
    if (hasTags) searchParams.tags = tags;

    const newLocationSearch = `?${new URLSearchParams(searchParams)}`;

    if (newLocationSearch !== history.location.search) {
      history.push({
        pathname: history.location.pathname,
        search: newLocationSearch,
      });
    }
  }, [categories, history, searchText, tags]);

  useEffect(() => {
    const filters = { searchText, categories, tags };
    if (isEqual(filters, lastFilters.current)) return;
    lastFilters.current = filters;
    dispatch(fetchMarketplaceTasks(filters));
  }, [dispatch, categories, searchText, tags]);

  return (
    <div className='marketplace-search'>
      <MarketplaceSearchHeader
        searchText={searchText}
        handleGoBack={handleGoBack}
        handleChangeSearchText={setSearchText}
      />

      <div className='marketplace-search-content'>
        <MarketplaceSearchFilters
          filters={categories}
          tagsPerCategory={tagsPerCategory}
          handleClearFilters={handleClearFilters}
          handleChangeTagFilters={handleChangeTagFilters}
          handleChangeCategoryFilters={handleChangeCategoryFilters}
        />

        <MarketplaceSearchResults
          tasks={tasks}
          listType={listType}
          listOrder={listOrder}
          searchText={searchText}
          isSearchingTasks={isSearchingTasks}
          handleChangeListOrder={setListOrder}
          handleChangeListType={handleChangeListType}
        />
      </div>
    </div>
  );
};

export default MarketplaceSearch;
