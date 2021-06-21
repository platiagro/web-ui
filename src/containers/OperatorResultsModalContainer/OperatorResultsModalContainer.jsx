import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { Modal } from 'uiComponents';
import { hideOperatorResults } from 'store/ui/actions';
import { getOperatorResultDataset, OPERATOR_TYPES } from 'store/operator';
import ResultsDrawer from 'pages/Experiments/Experiment/Drawer/ResultsDrawer';

const isVisibleSelector = ({ uiReducer }) => {
  return uiReducer.operatorResults.showOperatorResults;
};

const operatorIdSelector = ({ operatorReducer }) => {
  return operatorReducer.uuid;
};

const operatorDatasetSelector = ({ operatorReducer }) => {
  return operatorReducer.dataset;
};

const operatorFiguresSelector = ({ operatorReducer }) => {
  return operatorReducer.figures;
};

const operatorParametersSelector = ({ operatorReducer }) => {
  return operatorReducer.parameters;
};

const operatorParametersLatestTrainingSelector = ({ operatorReducer }) => {
  return operatorReducer.parametersLatestTraining;
};

const OperatorResultsModalContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const isVisible = useSelector(isVisibleSelector);
  const operatorId = useSelector(operatorIdSelector);
  const operatorDataset = useSelector(operatorDatasetSelector);
  const operatorFigures = useSelector(operatorFiguresSelector);
  const operatorParameters = useSelector(operatorParametersSelector);
  const operatorParametersLatestTraining = useSelector(
    operatorParametersLatestTrainingSelector
  );

  const operatorResultsLoading = useIsLoading(
    OPERATOR_TYPES.GET_OPERATOR_FIGURES_REQUEST
  );

  const datasetScrollX = useMemo(() => {
    return operatorDataset ? operatorDataset.columns.length * 100 : undefined;
  }, [operatorDataset]);

  // format results parameters to use label from parameter
  // and value from latest training
  const resultsParameters = useMemo(() => {
    const parametersArray = [];

    if (operatorParameters) {
      for (const operatorParameter of operatorParameters) {
        let valueLatestTraining = operatorParametersLatestTraining
          ? operatorParametersLatestTraining[operatorParameter.name]
          : null;

        if (Array.isArray(valueLatestTraining)) {
          valueLatestTraining = valueLatestTraining.join();
        }

        if (typeof valueLatestTraining === 'boolean') {
          valueLatestTraining = valueLatestTraining.toString();
        }

        const labelOrName = operatorParameter.label
          ? operatorParameter.label
          : operatorParameter.name;

        parametersArray.push({
          name: labelOrName,
          value: valueLatestTraining,
        });
      }
    }

    return parametersArray;
  }, [operatorParameters, operatorParametersLatestTraining]);

  const handleClose = () => {
    dispatch(hideOperatorResults());
  };

  const handleOnDatasetPageChange = (page, size) => {
    dispatch(
      getOperatorResultDataset(projectId, experimentId, operatorId, page, size)
    );
  };

  return (
    <Modal
      isFullScreen={true}
      isVisible={isVisible}
      closeButtonText='Fechar'
      handleClose={handleClose}
      title='Visualizar Resultados'
    >
      <ResultsDrawer
        dataset={operatorDataset}
        figures={operatorFigures}
        parameters={resultsParameters}
        isToShowDownloadButtons={true}
        loading={operatorResultsLoading}
        onDatasetPageChange={handleOnDatasetPageChange}
        datasetScroll={{
          x: datasetScrollX,
        }}
      />
    </Modal>
  );
};

export default OperatorResultsModalContainer;
