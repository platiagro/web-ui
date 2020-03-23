// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from './index';

// ACTIONS
import { hideDrawer } from '../../../../../../store/ui/actions';
/* import { fetchOperatorRequest } from '../../../../../../store/operator/actions'; */

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // hide drawer action
    handleHideDrawer: () => dispatch(hideDrawer()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { drawer: state.ui.drawer };
};

/**
 * Drawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DrawerContainer = ({ drawer, handleHideDrawer }) => {
  /*   // CONSTANTS
  // getting experiment uuid
  const { operatorId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching menu tasks
    handleFetchOperator();
  }, []);

  // HANDLERS
  const addFlowTaskHandler = (taskUuid) =>
    handleAddFlowTask(experimentUuid, taskUuid); */

  // RENDER
  return (
    <Drawer
      isVisible={drawer.visible}
      isDataset={drawer.isDataset}
      handleClose={handleHideDrawer}
      title={drawer.title}
    />
  );
};

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
