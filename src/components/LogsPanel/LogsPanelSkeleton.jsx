import React from 'react';
import { Skeleton } from 'antd';

const LogsPanelSkeleton = () => {
  return (
    <div className='logs-panel-skeletons'>
      <Skeleton.Button className='logs-panel-skeleton' size='large' active />
      <Skeleton.Button className='logs-panel-skeleton' size='large' active />
      <Skeleton.Button className='logs-panel-skeleton' size='large' active />
    </div>
  );
};

export default LogsPanelSkeleton;
