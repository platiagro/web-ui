import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button, Divider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { PlayCircleFilled, StopOutlined } from '@ant-design/icons';

import ToolbarConfig from 'components/ToolbarConfig';
import { RunDeploymentButton } from 'components/Buttons';
import { PromoteDeploymentModal } from 'components/Modals';
import SaveTemplateContainer from 'containers/SaveTemplateContainer';

import { useIsLoading } from 'hooks';
import { PROJECTS_TYPES } from 'store/projects';
import DEPLOYMENT_TYPES from 'store/deployments/deploymentRuns/actionTypes';
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';
import { fetchOperatorsRequest } from 'store/deployments/deploymentOperators/actions';

import './DeploymentToolbarContainer.less';
import {
  interruptDeploymentTest,
  testDeploymentWithDataset,
  TEST_DEPLOYMENT_TYPES,
} from 'store/testDeployment';

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const datasetOperatorUploadedFileNameSelector = ({
  deploymentOperatorsReducer,
}) => {
  const datasetOperator = deploymentOperatorsReducer.find((operator) => {
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

  const operators = useSelector(operatorsSelector);
  const datasetOperatorUploadedFileName = useSelector(
    datasetOperatorUploadedFileNameSelector
  );

  const isTestingFlow = useIsLoading(
    TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_REQUEST
  );

  const isLoading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const confirmButtonIsLoading = useIsLoading(
    DEPLOYMENT_TYPES.CREATE_DEPLOYMENT_RUN_REQUEST
  );

  const isEmpty = useMemo(() => {
    return operators.length <= 0;
  }, [operators]);

  const handleFetchOperators = useCallback(() => {
    dispatch(fetchOperatorsRequest(projectId, deploymentId));
  }, [projectId, deploymentId, dispatch]);

  const handleRunDeployment = () => {
    dispatch(
      deploymentRunsActions.createDeploymentRunRequest(
        projectId,
        deploymentId,
        history
      )
    );
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
      dispatch(
        testDeploymentWithDataset(
          projectId,
          deploymentId,
          datasetOperatorUploadedFileName
        )
      );
    }
  };

  const handleInterruptFlowTesting = () => {
    dispatch(interruptDeploymentTest(projectId, deploymentId));
  };

  useEffect(() => {
    if (deploymentId) {
      handleFetchOperators(projectId, deploymentId);
    }
  }, [projectId, deploymentId, handleFetchOperators]);

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

      <div>
        <ToolbarConfig deployment />
      </div>

      <div className='deployment-toolbar-container-buttons'>
        {isTestingFlow ? (
          <Button
            onClick={handleInterruptFlowTesting}
            icon={<StopOutlined />}
            type='primary-inverse'
            shape='round'
          >
            Interromper
          </Button>
        ) : (
          <Button
            className={
              datasetOperatorUploadedFileName
                ? 'deployment-toolbar-container-test-button'
                : ''
            }
            disabled={!datasetOperatorUploadedFileName}
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
