import React from 'react';

import { Icon, Popover } from 'antd';

const InfoHelper = ({ content, width = 150 }) => (
  <Popover
    overlayStyle={{
      width,
    }}
    content={content}
    trigger='click'
  >
    <Icon style={{ marginLeft: 10 }} type='question-circle' />
  </Popover>
);

export default InfoHelper;
