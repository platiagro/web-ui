import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircleOutlined } from '@ant-design/icons';

import './style.less';

const InfoRow = ({ title, dateTime, message }) => {
  return (
    <div className='InfoRow-Body'>
      <div className='InfoRow-Header'>
        <InfoCircleOutlined className='InfoRow-Icon' />
        {title}
        {dateTime}
      </div>

      <div className='InfoRow-Content'>{message}</div>
    </div>
  );
};

InfoRow.propTypes = {
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default InfoRow;
