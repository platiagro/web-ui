import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getDeploymentsUrl } from 'store/deployments';
import { ExternalDatasetHelperModal } from 'components/Modals';
import { PropertiesPanel, ExternalDatasetDrawer } from 'components';
import { clearTaskData, fetchTaskData, getTaskData } from 'store/tasks';
import { OPERATOR_TYPES, renameDeploymentOperator } from 'store/operator';
import { useBooleanState, useDeepEqualSelector, useIsLoading } from 'hooks';

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const isDatasetOperatorSelector = ({ operatorReducer }) => {
  return operatorReducer?.tags?.includes('DATASETS');
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
  const operatorOriginalTask = useDeepEqualSelector(getTaskData);
  const isDatasetOperator = useDeepEqualSelector(isDatasetOperatorSelector);
  const deploymentUrl = useDeepEqualSelector(getDeploymentsUrl(deploymentId));

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

  useEffect(() => {
    if (operator?.taskId) dispatch(fetchTaskData(operator.taskId));
    return () => dispatch(clearTaskData());
  }, [dispatch, operator?.taskId]);

  return (
    <PropertiesPanel
      title={operator?.name}
      isShowingEditIcon={!!operator?.name}
      isSavingNewTitle={isRenamingOperator}
      isEditingTitle={isEditingOperatorName}
      operatorOriginalTask={operatorOriginalTask}
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
