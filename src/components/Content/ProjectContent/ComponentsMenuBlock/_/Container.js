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
import {
  setTemplateRequest,
  deleteTemplateRequest,
} from '../../../../../store/templates/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchComponentsMenu: () => dispatch(fetchComponentsMenuRequest()),
    handleFilterComponentsMenu: (filter) =>
      dispatch(filterComponentsMenu(filter)),
    handleCreateOperator: (
      projectId,
      experimentId,
      componentId,
      components,
      isTemplate
    ) =>
      dispatch(
        createOperatorRequest(
          projectId,
          experimentId,
          componentId,
          components,
          isTemplate
        )
      ),
    handleSetTemplate: (projectId, experimentId, templateId) =>
      dispatch(setTemplateRequest(projectId, experimentId, templateId)),
    handleDeleteTemplate: (templateId) =>
      dispatch(deleteTemplateRequest(templateId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    componentsMenu: state.componentsMenu.filtered,
    components: state.components,
    loading: state.ui.componentsMenu.loading,
    trainingLoading: state.ui.experimentTraining.loading,
    trainingSucceeded: state.experiment.succeeded,
  };
};

/**
 * Components Menu Block Container.
 * This component is responsible for create a logic container for components
 * menu block with redux.
 */
const ComponentsMenuBlockContainer = ({
  components,
  loading,
  trainingLoading,
  trainingSucceeded,
  componentsMenu,
  handleFetchComponentsMenu,
  handleFilterComponentsMenu,
  handleCreateOperator,
  handleSetTemplate,
  disabled,
  handleDeleteTemplate,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching menu tasks
    handleFetchComponentsMenu();
  }, [handleFetchComponentsMenu]);

  // HANDLERS
  const createOperatorHandler = ({ key: componentId, keyPath }) => {
    // getting component type
    const componentType = keyPath[1];
    // is template
    const isTemplate = componentType === 'TEMPLATES';

    // is template
    if (isTemplate) handleSetTemplate(projectId, experimentId, componentId);
    // not is template
    else
      handleCreateOperator(
        projectId,
        experimentId,
        componentId,
        components,
        isTemplate
      );
  };

  // RENDER
  return (
    <ComponentsMenuBlock
      handleComponentClick={createOperatorHandler}
      handleFilter={handleFilterComponentsMenu}
      handleDeleteTemplate={handleDeleteTemplate}
      menu={componentsMenu}
      disabled={disabled || trainingLoading || trainingSucceeded}
      loading={loading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsMenuBlockContainer);
