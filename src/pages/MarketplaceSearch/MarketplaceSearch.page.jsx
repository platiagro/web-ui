import React from 'react';
import { useHistory } from 'react-router-dom';

import MarketplaceSearchHeader from './MarketplaceSearchHeader';
import MarketplaceSearchFilters from './MarketplaceSearchFilters';
import MarketplaceSearchResults from './MarketplaceSearchResults';

import './MarketplaceSearch.style.less';

const MarketplaceSearch = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className='marketplace-search'>
      <MarketplaceSearchHeader handleGoBack={handleGoBack} />
      <MarketplaceSearchFilters filters={{}} />
      <MarketplaceSearchResults tasks={[]} />
    </div>
  );
};

export default MarketplaceSearch;
