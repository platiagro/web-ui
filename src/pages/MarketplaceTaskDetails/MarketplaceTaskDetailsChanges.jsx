import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import { MarketplaceTaskItem } from 'components';

const MarketplaceTaskDetailsChanges = ({ taskData, isLoadingTask }) => {
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
        isLoadingTask ? null : (
          <>
            <div>
              <strong>Última atualização</strong>
            </div>

            <div className='marketplace-task-details-content-changes-text'>
              {taskData?.updatedAt}
            </div>
          </>
        )
      }
    >
      {isLoadingTask ? (
        <Skeleton active />
      ) : (
        <div className='marketplace-task-details-content-changes-text'>
          {taskData.changes}
        </div>
      )}
    </MarketplaceTaskItem.Box>
  );
};

MarketplaceTaskDetailsChanges.propTypes = {
  taskData: PropTypes.object,
  isLoadingTask: PropTypes.bool,
};

MarketplaceTaskDetailsChanges.defaultProps = {
  taskData: {},
  isLoadingTask: false,
};

export default MarketplaceTaskDetailsChanges;
