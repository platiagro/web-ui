import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';

import { ReactComponent as MarketPlaceIcon } from 'assets/marketplace.svg';

const NewTaskMarketplacePanel = ({ handleGoToMarketPlace }) => {
  return (
    <div className='new-task-page-content-panels-right'>
      <div className='new-task-page-content-panels-right-title'>
        Em breve você também poderá encontrar o que precisa no Marketplace
      </div>

      <MarketPlaceIcon />

      <Tooltip
        placement='bottom'
        title='Em breve o marketplace estará disponível'
      >
        <div>
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
      </Tooltip>
    </div>
  );
};

NewTaskMarketplacePanel.propTypes = {
  handleGoToMarketPlace: PropTypes.func.isRequired,
};

export default NewTaskMarketplacePanel;
