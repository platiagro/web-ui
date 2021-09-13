import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useIsLoading } from 'hooks';

import MarketplaceSearchHeader from './MarketplaceSearchHeader';
import MarketplaceSearchFilters from './MarketplaceSearchFilters';
import MarketplaceSearchResults from './MarketplaceSearchResults';
import {
  MARKETPLACE_LIST_TYPE,
  MARKETPLACE_LIST_ORDER,
} from './MarketplaceSearchConfigs';

import './MarketplaceSearch.style.less';

const MarketplaceSearch = () => {
  const history = useHistory();

  const tasks = [
    {
      uuid: '1',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
      author: {
        uuid: '1',
        name: 'Nome do Autor',
        img: '',
        userName: '@author',
      },
    },
    {
      uuid: '2',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
      author: {
        uuid: '1',
        name: 'Nome do Autor',
        img: '',
        userName: '@author',
      },
    },
    {
      uuid: '3',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
      author: {
        uuid: '1',
        name: 'Nome do Autor',
        img: '',
        userName: '@author',
      },
    },
    {
      uuid: '4',
      name: 'Upload de arquivo',
      type: 'Tarefa',
      category: 'DATASETS',
      description: 'Faça o upload de arquivo para usar como dataset.',
      author: {
        uuid: '1',
        name: 'Nome do Autor',
        img: '',
        userName: '@author',
      },
    },
  ];

  const isSearchingTasks = useIsLoading('searching');

  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(history.location.search);
    const paramsObject = {};
    searchParams.forEach((value, key) => {
      paramsObject[key] = value === 'true'; // value is a string
    });
    return paramsObject;
  });

  const [listType, setListType] = useState(MARKETPLACE_LIST_TYPE.GRID);
  const [listOrder, setListOrder] = useState(MARKETPLACE_LIST_ORDER.NEWER);

  const handleGoBack = () => {
    history.goBack();
  };

  const handleChangeFilters = (categoryKey, isChecked) => {
    setFilters((currentFilters) => {
      const filtersClone = { ...currentFilters };
      if (isChecked) filtersClone[categoryKey] = isChecked;
      else delete filtersClone[categoryKey];

      history.push({
        pathname: history.location.pathname,
        search: `?${new URLSearchParams(filtersClone)}`,
      });

      return filtersClone;
    });
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
          handleChangeFilters={handleChangeFilters}
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
