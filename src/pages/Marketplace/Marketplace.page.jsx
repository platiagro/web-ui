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

  return (
    <div className='marketplace'>
      <MarketplaceHeader handleGoBack={handleGoBack} />
      <MarketplaceSearch />
      <MarketplaceBasicTasks />
      <MarketplaceComplexTasks />
    </div>
  );
};

export default Marketplace;
