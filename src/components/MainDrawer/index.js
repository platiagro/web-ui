import React from 'react';

import { Drawer } from 'antd';

const MainDrawer = ({ children, title, isOpen, onClose }) => {
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   setVisible(isOpen);
  // }, [isOpen]);

  return (
    <Drawer
      width={350}
      title={title}
      placement='right'
      closable
      onClose={onClose}
      visible={isOpen}
    >
      {children}
    </Drawer>
  );
};

export default MainDrawer;
