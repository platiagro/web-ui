import React from 'react';
import { Skeleton } from 'antd';

const MarketplaceAuthorInfoSkeleton = () => {
  return (
    <div className='marketplace-author-info'>
      <div
        style={{ padding: '24px' }}
        className='marketplace-author-info-content'
      >
        <Skeleton.Avatar style={{ marginRight: '24px' }} size={100} active />

        <div>
          <div>
            <Skeleton.Button
              style={{ width: '250px', marginBottom: '8px' }}
              size='small'
              active
            />
          </div>

          <div>
            <Skeleton.Button
              style={{ width: '150px', marginBottom: '16px' }}
              size='small'
              active
            />
          </div>

          <div>
            <Skeleton.Button
              style={{ width: '50px', marginRight: '8px' }}
              size='small'
              active
            />

            <Skeleton.Button
              style={{ width: '50px', marginRight: '8px' }}
              size='small'
              active
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAuthorInfoSkeleton;
