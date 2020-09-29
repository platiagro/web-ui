import React from 'react';

//UI Libs
import { Skeleton } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// STYLES
import './style.less';

const LoadingBox = () => {
  return (
    <div className='loading-container'>
      <div className={'card skeleton-task-box'}>
        <div className='siders'>
          <div style={{ fontSize: '18px' }}>
            <LoadingOutlined spin />
          </div>
        </div>
        <div className='middle' style={{ padding: '16px 12px 0' }}>
          <Skeleton
            active
            paragraph={{ rows: 1, width: '100%' }}
            size='large'
            title={false}
          />
        </div>
        <div className='siders'></div>
      </div>
    </div>
  );
};

export default LoadingBox;
