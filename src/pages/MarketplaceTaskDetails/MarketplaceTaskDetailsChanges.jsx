import React from 'react';
import PropTypes from 'prop-types';

import { MarketplaceTaskItem } from 'components';

const MarketplaceTaskDetailsChanges = ({ changes, updatedAt }) => {
  return (
    <MarketplaceTaskItem.Box
      className='marketplace-task-details-content-changes'
      borderDirection='left'
      header={
        <div className='marketplace-task-details-content-changes-title'>
          O que há de novo?
        </div>
      }
      footer={
        <>
          <div>
            <strong>Última atualização</strong>
          </div>

          <div className='marketplace-task-details-content-changes-text'>
            {updatedAt}
          </div>
        </>
      }
    >
      <div className='marketplace-task-details-content-changes-text'>
        {changes}
      </div>
    </MarketplaceTaskItem.Box>
  );
};

MarketplaceTaskDetailsChanges.propTypes = {
  changes: PropTypes.string,
  updatedAt: PropTypes.string,
};

MarketplaceTaskDetailsChanges.defaultProps = {
  changes: '',
  updatedAt: '',
};

export default MarketplaceTaskDetailsChanges;
