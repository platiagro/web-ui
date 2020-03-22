// TODO: Alterar nome de components para tasks

// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ComponentsMenuBlock from './index';

// ACTIONS
import { addFlowTask } from '../../../../../store/experimentFlow/actions';
import {
  fetchComponentsMenuRequest,
  filterComponentsMenu,
} from '../../../../../store/componentsMenu/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchComponentsMenu: () => dispatch(fetchComponentsMenuRequest()),
    handleFilterComponentsMenu: (filter) =>
      dispatch(filterComponentsMenu(filter)),
    handleAddFlowTask: (experimentUuid, task) =>
      dispatch(addFlowTask(experimentUuid, task)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { componentsMenu: state.componentsMenu.filtered };
};

/**
 * Components Menu Block Container.
 * This component is responsible for create a logic container for components
 * menu block with redux.
 */
const ComponentsMenuBlockContainer = ({
  componentsMenu,
  handleFetchComponentsMenu,
  handleFilterComponentsMenu,
  handleAddFlowTask,
  disabled,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { experimentUuid } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching menu tasks
    handleFetchComponentsMenu();
  }, []);

  // HANDLERS
  const addFlowTaskHandler = (taskUuid) =>
    handleAddFlowTask(experimentUuid, taskUuid);

  // RENDER
  return (
    <ComponentsMenuBlock
      handleTaskMenuClick={addFlowTaskHandler}
      handleFilter={handleFilterComponentsMenu}
      menu={componentsMenu}
      disabled={disabled}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsMenuBlockContainer);
