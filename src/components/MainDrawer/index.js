import React from 'react';

import { Drawer } from 'antd';

const MainDrawer = ({
  children,
  title,
  isOpen,
  onClose,
  isFinished = null,
}) => {
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   setVisible(isOpen);
  // }, [isOpen]);

  return (
    <Drawer
      width={
        isFinished === 'Succeeded' || isFinished === 'Failed' ? '60vw' : 350
      }
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
