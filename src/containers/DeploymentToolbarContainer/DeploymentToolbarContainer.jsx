import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Divider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { PlayCircleFilled, StopOutlined } from '@ant-design/icons';

import ToolbarConfig from 'components/ToolbarConfig';
import { RunDeploymentButton } from 'components/Buttons';
import { PromoteDeploymentModal } from 'components/Modals';
import SaveTemplateContainer from 'containers/SaveTemplateContainer';

import { useIsLoading, useToggleState } from 'hooks';
import { PROJECTS_TYPES } from 'store/projects';
import {
  DEPLOYMENTS_RUNS_TYPES,
  createDeploymentRunRequest,
} from 'store/deployments/deploymentRuns';
import {
  fetchDeploymentOperatorsRequest,
  clearAllDeploymentOperators,
} from 'store/operators';
import {
  createPredictionWithDataset,
  getPredictionId,
  interruptPrediction,
  PREDICTION_TYPES,
} from 'store/prediction';

import './DeploymentToolbarContainer.less';
import { DeploymentTestResultModalContainer } from 'containers';

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const datasetOperatorUploadedFileNameSelector = ({ operatorsReducer }) => {
  const datasetOperator = operatorsReducer.find((operator) => {
    return operator.tags.includes('DATASETS');
  });

  const datasetParameter = datasetOperator?.parameters?.find((parameter) => {
    return parameter.name === 'dataset';
  });

  return datasetParameter?.value || '';
};

const DeploymentToolbarContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isShowingPromoteModal, setIsShowingPromoteModal] = useState(false);
  const [isShowingDeploymentTestModal, handleToggleDeploymentTestModal] =
    useToggleState(false);

  const operators = useSelector(operatorsSelector);
  const datasetOperatorUploadedFileName = useSelector(
    datasetOperatorUploadedFileNameSelector
  );

  const predictionId = useSelector(getPredictionId);

  const isTestingFlow = useIsLoading(
    PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST
  );

  const isLoading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const confirmButtonIsLoading = useIsLoading(
    DEPLOYMENTS_RUNS_TYPES.CREATE_DEPLOYMENT_RUN_REQUEST
  );

  const isEmpty = useMemo(() => {
    return operators.length <= 0;
  }, [operators]);

  const testDeploymentFlowClassName = useMemo(() => {
    return datasetOperatorUploadedFileName
      ? 'deployment-toolbar-container-test-button'
      : '';
  }, [datasetOperatorUploadedFileName]);

  const handleFetchOperators = useCallback(() => {
    dispatch(fetchDeploymentOperatorsRequest(projectId, deploymentId));
  }, [projectId, deploymentId, dispatch]);

  const handleClearOperators = useCallback(() => {
    dispatch(clearAllDeploymentOperators());
  }, [dispatch]);

  const handleRunDeployment = () => {
    dispatch(createDeploymentRunRequest(projectId, deploymentId, history));
  };

  const runDeploymentHandler = (inputValue) => {
    //TODO: Estou mostrando o valor do input no modal para quando for usar
    console.log(inputValue);
    handleRunDeployment();
  };

  const handleHidePromoteModal = () => {
    setIsShowingPromoteModal(false);
  };

  const handleShowPromoteModal = () => {
    setIsShowingPromoteModal(true);
  };

  const handleTestDeploymentFlow = () => {
    if (datasetOperatorUploadedFileName) {
      handleToggleDeploymentTestModal();

      dispatch(
        createPredictionWithDataset(
          projectId,
          deploymentId,
          datasetOperatorUploadedFileName
        )
      );
    }
  };

  const handleInterruptFlowTesting = () => {
    dispatch(interruptPrediction(projectId, deploymentId, predictionId));
  };

  useEffect(() => {
    if (deploymentId) {
      handleFetchOperators(projectId, deploymentId);
    } else {
      handleClearOperators();
    }
  }, [projectId, deploymentId, handleFetchOperators, handleClearOperators]);

  useEffect(() => {
    if (isTestingFlow) {
      message.loading({
        key: 'isTestingFlow',
        content: 'Testando o Fluxo',
      });
    } else {
      message.destroy('isTestingFlow');
    }
  }, [isTestingFlow]);

  return (
    <div className='deployment-toolbar-container'>
      <PromoteDeploymentModal
        isInputDisabled={true}
        visible={isShowingPromoteModal}
        initialInputValue={deploymentId}
        onConfirm={runDeploymentHandler}
        onClose={handleHidePromoteModal}
        urlSuffix='/api/v1.0/predictions'
        confirmButtonIsLoading={confirmButtonIsLoading}
        urlPrefix={`${window.location.origin.toString()}/seldon/anonymous/`}
      />

      <DeploymentTestResultModalContainer
        projectId={projectId}
        deploymentId={deploymentId}
        isTestingFlow={isTestingFlow}
        isShowingModal={isShowingDeploymentTestModal}
        handleHideModal={handleToggleDeploymentTestModal}
      />

      <div className='deployment-toolbar-container-controls'>
        <ToolbarConfig deployment />
      </div>

      <div className='deployment-toolbar-container-buttons'>
        {isTestingFlow ? (
          <Button
            onClick={handleInterruptFlowTesting}
            icon={<StopOutlined />}
            type='primary-inverse'
            shape='round'
            disabled // TODO: Habilitar botão quando o "Interromper" funcionar
          >
            Interromper
          </Button>
        ) : (
          <Button
            disabled={!datasetOperatorUploadedFileName}
            className={testDeploymentFlowClassName}
            onClick={handleTestDeploymentFlow}
            icon={<PlayCircleFilled />}
            shape='round'
          >
            Testar Fluxo
          </Button>
        )}

        <Divider
          className='deployment-toolbar-container-divider'
          type='vertical'
        />

        <SaveTemplateContainer disabled={isLoading || isEmpty} />

        <RunDeploymentButton
          onClick={handleShowPromoteModal}
          disabled={isLoading || isEmpty}
        />
      </div>
    </div>
  );
};

export default DeploymentToolbarContainer;
