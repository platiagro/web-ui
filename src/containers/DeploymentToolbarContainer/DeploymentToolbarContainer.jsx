import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { RunDeploymentButton } from 'components/Buttons';
import { PromoteDeploymentModal } from 'components/Modals';
import SaveTemplateContainer from 'containers/SaveTemplateContainer';
import ToolbarConfig from 'components/ToolbarConfig';

import { fetchOperatorsRequest } from 'store/deployments/deploymentOperators/actions';
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentName.loading;
};

const DeploymentToolbarContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { projectId, deploymentId } = useParams();
  const [isShowingPromoteModal, setIsShowingPromoteModal] = useState(false);

  const loading = useSelector(loadingSelector);
  const operators = useSelector(operatorsSelector);

  const empty = useMemo(() => operators.length <= 0, [operators]);

  const handleFetchOperators = useCallback(() => {
    dispatch(fetchOperatorsRequest(projectId, deploymentId));
  }, [projectId, deploymentId, dispatch]);

  const handleRunDeployment = () =>
    dispatch(
      deploymentRunsActions.createDeploymentRunRequest(
        projectId,
        deploymentId,
        history
      )
    );

  useEffect(() => {
    if (deploymentId) {
      handleFetchOperators(projectId, deploymentId);
    }
  }, [projectId, deploymentId, handleFetchOperators]);

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

  return (
    <div className='buttons-config'>
      <PromoteDeploymentModal
        urlPrefix={`${window.location.origin.toString()}/seldon/anonymous/`}
        urlSuffix='/api/v1.0/predictions'
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
