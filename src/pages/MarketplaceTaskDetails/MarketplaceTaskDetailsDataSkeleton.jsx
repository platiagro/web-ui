import React from 'react';
import { Skeleton } from 'antd';

const MarketplaceTaskDetailsDataSkeleton = () => {
  return (
    <div className='marketplace-task-details-content-data'>
      <div className='marketplace-task-details-content-data-skeleton'>
        <div style={{ marginBottom: '24px' }}>
          <Skeleton.Avatar size={100} style={{ marginRight: '24px' }} active />
          <Skeleton.Button style={{ width: '150px' }} size='small' active />
        </div>

        <Skeleton active />
      </div>
    </div>
  );
};

export default MarketplaceTaskDetailsDataSkeleton;
