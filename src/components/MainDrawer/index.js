import React from 'react';

import { Drawer } from 'antd';

const MainDrawer = ({ children, title }) => (
  <Drawer
    width={350}
    title={title}
    placement='right'
    closable
    onClose={null}
    visible
  >
    {children}
  </Drawer>
);

export default MainDrawer;
