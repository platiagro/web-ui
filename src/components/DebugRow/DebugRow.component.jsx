import React from 'react';
import PropTypes from 'prop-types';
import { CodeOutlined } from '@ant-design/icons';

import './style.less';

const DebugRow = ({ title, dateTime, message }) => {
  return (
    <div className='DebugRow-Body'>
      <div className='DebugRow-Header'>
        <CodeOutlined className='DebugRow-Icon' />
        {title}
        {dateTime}
      </div>

      <div className='DebugRow-Content'>{message}</div>
    </div>
  );
};

DebugRow.propTypes = {
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default DebugRow;
