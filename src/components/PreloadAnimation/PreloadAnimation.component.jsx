// REACT LIBS
import React from 'react';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { Result, Spin } from 'antd';

import './PreloadAnimation.less';

/**
 * Renders an animation while some content is loading.
 */
const PreloadAnimation = () => {
  return (
    <div className='contentPage'>
      <Result
        icon={
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: '72px', color: '#004e66' }} />
            }
          />
        }
        title={
          <>
            Preparando o JupyterLab.
            <br />
            Aguarde um instante...
          </>
        }
      />
    </div>
  );
};

// PROP TYPES
PreloadAnimation.propTypes = {};

// EXPORT DEFAULT
export default PreloadAnimation;
