import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { ResultsButtonBar } from 'components/Buttons';
import { showOperatorResults } from 'store/ui/actions';
import { PropertiesPanel, PropertyBlock } from 'components';
import DatasetDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/GenericDrawer/_/Container';
import NotebookOutputsContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/NotebookOutputs/_/NotebookOutputsContainer';

import './OperatorResizableSectionContainer.less';

const operatorDescriptionSelector = ({ operatorReducer }) => {
  return operatorReducer.description;
};

const experimentSelector = (experimentId) => ({ experimentsReducer }) => {
  return experimentsReducer.find(({ uuid }) => uuid === experimentId);
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
  const { experimentId } = useParams();
  const dispatch = useDispatch();

  const [HasExperimentFinished, setHasExperimentFinished] = useState(false);

  const operatorDescription = useSelector(operatorDescriptionSelector);
  const experiment = useSelector(experimentSelector(experimentId));
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

          {isDatasetOperator && (
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
