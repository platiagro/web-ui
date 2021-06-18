import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

import './LoadingBox.style.less';

const LoadingBox = ({ siderColor, absolute }) => {
  return (
    <div className='loading-container'>
      <div
        className={'card-loading skeleton-task-box'}
        style={absolute ? { position: 'absolute' } : {}}
      >
        <div className='siders' style={{ backgroundColor: siderColor }}>
          <div style={{ fontSize: '18px' }}>
            <LoadingOutlined spin />
          </div>
        </div>

        <div className='middle' style={{ padding: '16px 12px 0' }}>
          <Skeleton
            size='large'
            title={false}
            paragraph={{ rows: 1, width: '100%' }}
            active
          />
        </div>

        <div className='siders' style={{ backgroundColor: siderColor }}></div>
      </div>
    </div>
  );
};

LoadingBox.propTypes = {
  siderColor: PropTypes.string,
  absolute: PropTypes.bool,
};

LoadingBox.defaultProps = {
  siderColor: '#f9f0ff',
  absolute: true,
};

export default LoadingBox;
