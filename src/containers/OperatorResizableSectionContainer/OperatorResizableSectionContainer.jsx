import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { OPERATOR_STATUS } from 'configs';
import { ResultsButtonBar } from 'components/Buttons';
import { showOperatorResults } from 'store/ui/actions';
import { PropertiesPanel, PropertyBlock } from 'components';
import DatasetDrawerContainer from 'pages/Experiments/Experiment/Drawer/DatasetDrawer/DatasetDrawerContainer';
import GenericDrawerContainer from 'pages/Experiments/Experiment/Drawer/GenericDrawer/GenericDrawerContainer';
import NotebookOutputsContainer from 'pages/Experiments/Experiment/Drawer/NotebookOutputs/NotebookOutputsContainer';

import './OperatorResizableSectionContainer.less';

const isDatasetOperatorSelector = ({ operatorReducer }) => {
  return operatorReducer.tags
    ? operatorReducer.tags.includes('DATASETS')
    : false;
};

const operatorSelector = ({ operatorReducer, operatorsReducer }) => {
  const currentOperatorId = operatorReducer.uuid;

  // These lines below are important to get the latest operator status
  // to enable or disable the buttons of this component.
  // The operatorsReducer is an array related to the operators long polling
  const operatorFound = operatorsReducer.find(
    ({ uuid }) => uuid === currentOperatorId
  );

  return operatorFound || operatorReducer;
};

const OperatorResizableSectionContainer = () => {
  const { experimentId } = useParams();
  const dispatch = useDispatch();

  const isDatasetOperator = useSelector(isDatasetOperatorSelector);
  const operator = useSelector(operatorSelector);

  const isResultsButtonBarDisabled = useMemo(() => {
    const isOperatorPending = operator.status === OPERATOR_STATUS.PENDING;
    const isOperatorRunning = operator.status === OPERATOR_STATUS.RUNNING;
    const isOperatorUnset = operator.status === OPERATOR_STATUS.UNSET;
    const hasNoOperatorStatus = !operator.status;

    return (
      !experimentId ||
      hasNoOperatorStatus ||
      isOperatorUnset ||
      isOperatorPending ||
      isOperatorRunning
    );
  }, [experimentId, operator.status]);

  const isNotebookOutputsContainerDisabled = useMemo(() => {
    const isOperatorPending = operator.status === OPERATOR_STATUS.PENDING;
    const isOperatorRunning = operator.status === OPERATOR_STATUS.RUNNING;
    return !experimentId || isOperatorPending || isOperatorRunning;
  }, [operator.status, experimentId]);

  const handleShowResults = () => {
    dispatch(showOperatorResults());
  };

  return (
    <PropertiesPanel tip={operator.description} title={operator.name}>
      {!!operator?.name && (
        <>
          {isDatasetOperator && <DatasetDrawerContainer />}

          <div className='operator-resizable-section-drawer'>
            {!isDatasetOperator && <GenericDrawerContainer />}
          </div>

          {!isDatasetOperator && (
            <PropertyBlock>
              <ResultsButtonBar
                showingResults={false}
                disabled={isResultsButtonBarDisabled}
                handleResultsClick={handleShowResults}
              />

              <NotebookOutputsContainer
                disabled={isNotebookOutputsContainerDisabled}
              />
            </PropertyBlock>
          )}
        </>
      )}
    </PropertiesPanel>
  );
};

export default OperatorResizableSectionContainer;
