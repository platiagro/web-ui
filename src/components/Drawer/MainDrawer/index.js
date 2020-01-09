import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { clearSelected } from '../../../store/actions/experimentActions';
import { hideDrawer } from '../../../store/actions/drawerActions';

/**
 * Main drawer container of application.
 */
const MainDrawer = ({
  children,
  title,
  onClose,
  isFinished = null,
  visible,
}) => {
  return (
    // main drawer - drawer container
    <Drawer
      placement='right'
      closable
      width={
        isFinished === 'Succeeded' || isFinished === 'Failed' ? '60vw' : 350
      }
      title={title}
      onClose={onClose}
      visible={visible}
    >
      {/* children drawer - drawer content */}
      {children}
    </Drawer>
  );
};

MainDrawer.propTypes = {
  /** children drawer */
  children: PropTypes.element,
  /** title of drawer */
  title: PropTypes.string.isRequired,
  /** on close handle function */
  onClose: PropTypes.func.isRequired,
  /** if drawer task is finished */
  isFinished: PropTypes.oneOf([
    'StartRun',
    'Running',
    'Succeeded',
    'Failed',
    'Loading',
    '',
    null,
  ]),
  /** drawer is visible */
  visible: PropTypes.bool.isRequired,
};

MainDrawer.defaultProps = {
  /** children prop default is null */
  children: null,
  /** is finished prop default is null */
  isFinished: null,
};

const mapStateToProps = (state) => ({
  visible: state.drawer.visible,
  title: state.drawer.title,
  children: state.drawer.children,
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(clearSelected());
    dispatch(hideDrawer());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDrawer);
