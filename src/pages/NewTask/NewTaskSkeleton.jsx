import React from 'react';
import { Skeleton } from 'antd';

const NewTaskSkeletons = () => {
  return (
    <div className='new-task-page-content-panels-left-skeletons'>
      <Skeleton.Button
        className='new-task-page-content-panels-left-skeleton'
        size='large'
        active
      />

      <Skeleton.Button
        className='new-task-page-content-panels-left-skeleton'
        size='large'
        active
      />

      <Skeleton.Button
        className='new-task-page-content-panels-left-skeleton'
        size='large'
        active
      />

      <Skeleton.Button
        className='new-task-page-content-panels-left-skeleton'
        size='large'
        active
      />

      <Skeleton.Button
        className='new-task-page-content-panels-left-skeleton'
        size='large'
        active
      />
    </div>
  );
};

export default NewTaskSkeletons;
