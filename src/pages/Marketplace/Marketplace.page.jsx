import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  MARKETPLACE_TYPES,
  getTotalMarketplaceTasks,
  fetchTotalMarketplaceTasks,
} from 'store/marketplace';
import { useIsLoading } from 'hooks';

import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceSearch from './MarketplaceSearch';
import MarketplaceBasicTasks from './MarketplaceBasicTasks';
import MarketplaceComplexTasks from './MarketplaceComplexTasks';

import './Marketplace.style.less';

const Marketplace = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const numberOfTasks = useSelector(getTotalMarketplaceTasks);

  const isLoadingNumberOfTasks = useIsLoading(
    MARKETPLACE_TYPES.FETCH_TOTAL_TASKS
  );

  const handleGoBack = () => {
    history.goBack();
  };

  const handleSearchTasks = (categoryKey) => {
    const searchParams = new URLSearchParams({
      [categoryKey]: true,
    });

    history.push({
      pathname: '/marketplace/tarefas',
      search: `?${searchParams}`,
    });
  };

  useEffect(() => {
    dispatch(fetchTotalMarketplaceTasks());
  }, [dispatch]);

  return (
    <div className='marketplace'>
      <MarketplaceHeader handleGoBack={handleGoBack} />

      <MarketplaceSearch
        numberOfTasks={numberOfTasks}
        isLoadingNumberOfTasks={isLoadingNumberOfTasks}
      />

      <MarketplaceBasicTasks handleSearchTasks={handleSearchTasks} />
      <MarketplaceComplexTasks handleSearchTasks={handleSearchTasks} />
    </div>
  );
};

export default Marketplace;
