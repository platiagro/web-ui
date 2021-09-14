import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { useHistory } from 'react-router';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

import { useBooleanState, useDebounce } from 'hooks';
import { MarketplaceColorfulComponent } from 'assets';

const MarketplaceSearch = ({ numberOfTasks }) => {
  const history = useHistory();

  const [isSearching, handleStartSearching, handleStopSearching] =
    useBooleanState();

  const handleSeeAllTasks = () => {
    history.push('/marketplace/tarefas');
  };

  const handleChangeSearchText = useDebounce({
    delay: 1000,
    startCallback() {
      handleStartSearching();
    },
    stopCallback(search) {
      handleStopSearching();
      history.push({
        pathname: '/marketplace/tarefas',
        search: `?${new URLSearchParams({ search })}`,
      });
    },
  });

  return (
    <div className={'marketplace-search'}>
      <div className='marketplace-search-content'>
        <div className='marketplace-search-left'>
          <div className='marketplace-search-title'>
            Encontre soluções prontas para o seu problema
          </div>

          <Input
            className='marketplace-search-input'
            onChange={(e) => handleChangeSearchText(e.target.value)}
            placeholder='Comece a digitar para buscar no marketplace'
            suffix={isSearching ? <LoadingOutlined /> : <SearchOutlined />}
          />

          <div className='marketplace-search-more'>
            <div className='marketplace-search-more-text'>
              Você também pode:
            </div>

            <Button shape='round' onClick={handleSeeAllTasks}>
              Ver todas as {numberOfTasks} soluções
            </Button>
          </div>
        </div>

        <div className='marketplace-search-right'>
          <MarketplaceColorfulComponent />
        </div>
      </div>
    </div>
  );
};

MarketplaceSearch.propTypes = {
  numberOfTasks: PropTypes.number,
};

MarketplaceSearch.defaultProps = {
  numberOfTasks: 0,
};

export default MarketplaceSearch;
