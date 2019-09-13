import React from 'react';

import { Drawer } from 'antd';

const MainDrawer = () => (
  <Drawer
    title='Basic Drawer'
    placement='right'
    closable={false}
    onClose={null}
    visible={false}
  >
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
);

export default MainDrawer;
