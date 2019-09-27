import React from 'react';

import { Icon, Popover } from 'antd';

const InfoHelper = ({ content }) => (
  <Popover
    overlayStyle={{
      width: 150,
    }}
    content={content}
    trigger='click'
  >
    <Icon style={{ marginLeft: 10 }} type='question-circle' />
  </Popover>
);

export default InfoHelper;
