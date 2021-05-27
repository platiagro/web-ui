import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { ShoppingOutlined } from '@ant-design/icons';

import { ReactComponent as MarketPlaceIcon } from 'assets/marketplace.svg';

const NewTaskMarketplacePanel = ({ handleGoToMarketPlace }) => {
  return (
    <div className='new-task-page-content-panels-right'>
      <div className='new-task-page-content-panels-right-title'>
        Você também pode encontrar o que precisa no Marketplace
      </div>

      <MarketPlaceIcon />

      <Button
        className='new-task-page-content-panels-right-button'
        onClick={handleGoToMarketPlace}
        icon={<ShoppingOutlined />}
        shape='round'
        disabled // TODO: Enable when the marketplace exists
      >
        Ir Para o Marketplace
      </Button>
    </div>
  );
};

NewTaskMarketplacePanel.propTypes = {
  handleGoToMarketPlace: PropTypes.func.isRequired,
};

export default NewTaskMarketplacePanel;
