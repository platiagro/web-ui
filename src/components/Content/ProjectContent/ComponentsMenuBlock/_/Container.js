// TODO: Alterar nome de components para tasks

// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ComponentsMenuBlock from './index';

// ACTIONS
import { createOperatorRequest } from '../../../../../store/operator/actions';
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
    handleCreateOperator: (projectId, experimentId, componentId, components) =>
      dispatch(
        createOperatorRequest(projectId, experimentId, componentId, components)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    componentsMenu: state.componentsMenu.filtered,
    components: state.components,
  };
};

/**
 * Components Menu Block Container.
 * This component is responsible for create a logic container for components
 * menu block with redux.
 */
const ComponentsMenuBlockContainer = ({
  components,
  componentsMenu,
  handleFetchComponentsMenu,
  handleFilterComponentsMenu,
  handleCreateOperator,
  disabled,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching menu tasks
    handleFetchComponentsMenu();
  }, []);

  // HANDLERS
  const createOperatorHandler = ({ key: componentId }) =>
    handleCreateOperator(projectId, experimentId, componentId, components);

  // RENDER
  return (
    <ComponentsMenuBlock
      handleComponentClick={createOperatorHandler}
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
