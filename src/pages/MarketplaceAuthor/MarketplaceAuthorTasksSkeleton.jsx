import React from 'react';
import { Skeleton } from 'antd';

const MarketplaceAuthorTasksSkeleton = () => {
  return (
    <div className='marketplace-author-tasks'>
      <div className='marketplace-author-tasks-content'>
        <Skeleton.Button
          className='marketplace-author-tasks-content-skeleton'
          active
        />

        <Skeleton.Button
          className='marketplace-author-tasks-content-skeleton'
          active
        />

        <Skeleton.Button
          className='marketplace-author-tasks-content-skeleton'
          active
        />

        <Skeleton.Button
          className='marketplace-author-tasks-content-skeleton'
          active
        />
      </div>
    </div>
  );
};

export default MarketplaceAuthorTasksSkeleton;
