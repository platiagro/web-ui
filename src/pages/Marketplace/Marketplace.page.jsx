import React from 'react';
import { useHistory } from 'react-router-dom';

import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceSearch from './MarketplaceSearch';
import MarketplaceBasicTasks from './MarketplaceBasicTasks';
import MarketplaceComplexTasks from './MarketplaceComplexTasks';

import './Marketplace.style.less';

const Marketplace = () => {
  const history = useHistory();

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

  return (
    <div className='marketplace'>
      <MarketplaceHeader handleGoBack={handleGoBack} />
      <MarketplaceSearch />
      <MarketplaceBasicTasks handleSearchTasks={handleSearchTasks} />
      <MarketplaceComplexTasks handleSearchTasks={handleSearchTasks} />
    </div>
  );
};

export default Marketplace;
