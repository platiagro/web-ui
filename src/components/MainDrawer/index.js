import React from 'react';

import { Drawer } from 'antd';

class MainDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: true };
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { children, title } = this.props;
    const { visible } = this.state;
    return (
      <Drawer
        width={350}
        title={title}
        placement='right'
        closable
        onClose={this.handleClose}
        visible={visible}
      >
        {children}
      </Drawer>
    );
  }
}

export default MainDrawer;
