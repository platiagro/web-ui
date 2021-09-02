import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { MarketplaceColorfulComponent } from 'assets';

const MarketplaceSearch = ({ numberOfTasks }) => {
  const handleSeeAllTasks = () => {
    console.log('See all');
  };

  return (
    <div className={'marketplace-section marketplace-search'}>
      <div className='marketplace-search-left'>
        <div className='marketplace-search-title'>
          Encontre Soluções Prontas Para o Seu Problema
        </div>

        <Input
          className='marketplace-search-input'
          placeholder='Comece a Digitar para Buscar no Marketplace'
          suffix={<SearchOutlined />}
        />

        <div className='marketplace-search-more'>
          <div className='marketplace-search-more-text'>Você também pode:</div>

          <Button shape='round' onClick={handleSeeAllTasks}>
            Ver todas as {numberOfTasks} soluções
          </Button>
        </div>
      </div>

      <div className='marketplace-search-right'>
        <MarketplaceColorfulComponent />
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
