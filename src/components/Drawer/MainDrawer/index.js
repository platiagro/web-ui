import React from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { hideDrawer } from '../../../store/actions/drawerActions';

const MainDrawer = ({
  children,
  title,
  onClose,
  isFinished = null,
  visible,
}) => {
  return (
    <Drawer
      width={
        isFinished === 'Succeeded' || isFinished === 'Failed' ? '60vw' : 350
      }
      title={title}
      placement='right'
      closable
      onClose={onClose}
      visible={visible}
    >
      {children}
    </Drawer>
  );
};

const mapStateToProps = (state) => ({ visible: state.drawer.visible });

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(hideDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainDrawer);
