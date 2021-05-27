import React from 'react';
import { Skeleton } from 'antd';

const NewTaskSkeletons = () => {
  return (
    <div className='new-task-page-content-panels-left-skeletons'>
      <Skeleton.Button size='large' active />
      <Skeleton.Button size='large' active />
      <Skeleton.Button size='large' active />
    </div>
  );
};

export default NewTaskSkeletons;
