import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ExternalDatasetHelperModal } from 'components/Modals';
import { PropertiesPanel, ExternalDatasetDrawer } from 'components';
import { OPERATOR_TYPES, renameDeploymentOperator } from 'store/operator';
import { useBooleanState, useDeepEqualSelector, useIsLoading } from 'hooks';

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const isDatasetOperatorSelector = ({ operatorReducer }) => {
  return operatorReducer?.tags?.includes('DATASETS');
};

export const deploymentsUrlSelector =
  (currentDeploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === currentDeploymentId)
      ?.url || `${window.location.origin.toString()}/seldon/anonymous/${currentDeploymentId}/api/v1.0/predictions`;
  };

const PropertiesResizableContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const [
    isShowingExternalDatasetHelperModal,
    handleShowExternalDatasetHelperModal,
    handleHideExternalDatasetHelperModal,
  ] = useBooleanState(false);

  const [
    isEditingOperatorName,
    handleStartEditingOperatorName,
    handleCancelEditingOperatorName,
  ] = useBooleanState(false);

  const operator = useDeepEqualSelector(operatorSelector);
  const isDatasetOperator = useDeepEqualSelector(isDatasetOperatorSelector);
  const deploymentUrl = useDeepEqualSelector(
    deploymentsUrlSelector(deploymentId)
  );

  const isRenamingOperator = useIsLoading(
    OPERATOR_TYPES.RENAME_DEPLOYMENT_OPERATOR_REQUEST
  );

  const handleSaveNewOperatorName = (newName) => {
    const operatorId = operator?.uuid;
    dispatch(
      renameDeploymentOperator({
        projectId,
        deploymentId,
        operatorId,
        newName,
        successCallback: handleCancelEditingOperatorName,
      })
    );
  };

  // Cancel the edition of the operator name when change the selected operator
  useEffect(() => {
    handleCancelEditingOperatorName();
  }, [handleCancelEditingOperatorName, operator.uuid]);

  return (
    <PropertiesPanel
      title={operator?.name}
      tip={operator?.description}
      isShowingEditIcon={!!operator?.name}
      isEditingTitle={isEditingOperatorName}
      isSavingNewTitle={isRenamingOperator}
      handleSaveModifiedTitle={handleSaveNewOperatorName}
      handleStartEditing={handleStartEditingOperatorName}
      handleCancelEditing={handleCancelEditingOperatorName}
    >
      {isDatasetOperator && (
        <ExternalDatasetDrawer
          propertyTitle='Tipo da fonte de dados'
          propertyTip='Dica'
          urlText={deploymentUrl}
          onClickLearnMore={handleShowExternalDatasetHelperModal}
          description="Você pode testar o fluxo com um cliente HTTP, por exemplo o <a target='_blank' rel='noreferrer' href='https://www.postman.com' >Postman.</a>"
        />
      )}

      <ExternalDatasetHelperModal
        onClose={handleHideExternalDatasetHelperModal}
        visible={isShowingExternalDatasetHelperModal}
        url={deploymentUrl}
      />
    </PropertiesPanel>
  );
};

export default PropertiesResizableContainer;
