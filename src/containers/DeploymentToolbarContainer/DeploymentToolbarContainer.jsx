import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { RunDeploymentButton } from 'components/Buttons';
import { PromoteDeploymentModal } from 'components/Modals';
import SaveTemplateContainer from 'containers/SaveTemplateContainer';
import ToolbarConfig from 'components/ToolbarConfig';

import { fetchOperatorsRequest } from 'store/deployments/deploymentOperators/actions';
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentName.loading;
};

const DeploymentToolbarContainer = () => {
  const history = useHistory();
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(loadingSelector);
  const operators = useSelector(operatorsSelector);

  const handleFetchOperators = useCallback(() => {
    dispatch(fetchOperatorsRequest(projectId, deploymentId));
  }, [projectId, deploymentId, dispatch]);

  const handleRunDeployment = (projectId, deploymentId) =>
    dispatch(
      deploymentRunsActions.createDeploymentRunRequest(
        projectId,
        deploymentId,
        history
      )
    );

  const empty = operators.length <= 0;

  const [isShowingPromoteModal, setIsShowingPromoteModal] = useState(false);

  useEffect(() => {
    if (deploymentId) {
      handleFetchOperators(projectId, deploymentId);
    }
  }, [projectId, deploymentId, handleFetchOperators]);

  const runDeploymentHandler = (inputValue) => {
    //TODO: Estou mostrando o valor do input no modal para quando for usar
    console.log(inputValue);
    handleRunDeployment(projectId, deploymentId);
  };

  const handleHidePromoteModal = () => {
    setIsShowingPromoteModal(false);
  };

  const handleShowPromoteModal = () => {
    setIsShowingPromoteModal(true);
  };

  return (
    <div className='buttons-config'>
      <PromoteDeploymentModal
        urlPrefix='http://10.50.11.116/'
        urlSuffix='/prediction'
        visible={isShowingPromoteModal}
        loading={loading}
        onClose={handleHidePromoteModal}
        onConfirm={runDeploymentHandler}
        initialInputValue={deploymentId}
        inputDisabled={true}
      />
      <div>
        {/** FIXME: missing toolbar config */}
        <ToolbarConfig deployment />
      </div>
      <div>
        <SaveTemplateContainer
          className='deployment-buttons'
          disabled={loading || empty}
        />
        <RunDeploymentButton
          className='deployment-buttons'
          onClick={handleShowPromoteModal}
          disabled={loading || empty}
        />
      </div>
    </div>
  );
};

// EXPORT
export default DeploymentToolbarContainer;
