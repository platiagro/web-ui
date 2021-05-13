import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ResultsButtonBar } from 'components/Buttons';
import { showOperatorResults } from 'store/ui/actions';
import { PropertiesPanel, PropertyBlock } from 'components';
import DatasetDrawerContainer from 'pages/Experiments/Experiment/Drawer/DatasetDrawer/DatasetDrawerContainer';
import GenericDrawerContainer from 'pages/Experiments/Experiment/Drawer/GenericDrawer/GenericDrawerContainer';
import NotebookOutputsContainer from 'pages/Experiments/Experiment/Drawer/NotebookOutputs/NotebookOutputsContainer';
import { getExperiment } from 'store/projects/experiments/experiments.selectors';
import './OperatorResizableSectionContainer.less';

const operatorDescriptionSelector = ({ operatorReducer }) => {
  return operatorReducer.description;
};

const isDatasetOperatorSelector = ({ operatorReducer }) => {
  return operatorReducer.tags
    ? operatorReducer.tags.includes('DATASETS')
    : false;
};

const operatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const OperatorResizableSectionContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const [HasExperimentFinished, setHasExperimentFinished] = useState(false);

  // TODO: Criar seletor com reselect
  /* eslint-disable-next-line */
  const experiment = useSelector((state) =>
    getExperiment(state, projectId, experimentId)
  );

  const operatorDescription = useSelector(operatorDescriptionSelector);
  const isDatasetOperator = useSelector(isDatasetOperatorSelector);
  const operatorName = useSelector(operatorNameSelector);

  const handleShowResults = () => {
    dispatch(showOperatorResults());
  };

  useEffect(() => {
    if (experimentId) {
      // Do not change "succeded" to "succeeded" or it will fail
      const wasExperimentSucceed = experiment?.succeded || false;
      setHasExperimentFinished(wasExperimentSucceed);
    }
  }, [experiment, experimentId]);

  return (
    <PropertiesPanel tip={operatorDescription} title={operatorName}>
      {!!operatorName && (
        <>
          {isDatasetOperator && <DatasetDrawerContainer />}

          <div className='operator-resizable-section-drawer'>
            {!isDatasetOperator && <GenericDrawerContainer />}
          </div>

          {!isDatasetOperator && (
            <PropertyBlock>
              <ResultsButtonBar
                showingResults={false}
                disabled={!HasExperimentFinished}
                handleResultsClick={handleShowResults}
              />

              <NotebookOutputsContainer />
            </PropertyBlock>
          )}
        </>
      )}
    </PropertiesPanel>
  );
};

export default OperatorResizableSectionContainer;
