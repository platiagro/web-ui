// REACT LIBS
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { PropertiesPanel } from 'components';
import InputBlockContainer from 'components/InputBlockContainer';
import OperatorLogBlock from 'components/LogBlock';
import DatasetDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/GenericDrawer/_/Container';
import NotebookOutputsContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/NotebookOutputs/_/Container';
import ResultsButtonBar from 'components/Content/ExperimentsContent/Experiment/Drawer/ResultsButtonBar';

// ACTIONS
import { getExperimentById } from 'store/experiments/experimentsReducer';
import { showOperatorResults } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowResultsClick: () => dispatch(showOperatorResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experimentIsFinished: (experimentId) => {
      return getExperimentById(state, experimentId).succeeded;
    },
    operatorDescription: state.operatorReducer.description,
    operatorIsDataset: state.operatorReducer.tags
      ? state.operatorReducer.tags.includes('DATASETS')
      : false,
    operatorLogs: state.operatorReducer.logs,
    operatorName: state.operatorReducer.name,
    operatorStatus: state.operatorReducer.status,
  };
};

/**
 * Container to display experiment flow operator parameters, results and metrics.
 *
 * @param {object} props Container props
 * @returns {OperatorResizableSectionContainer} Container
 * @component
 */
const OperatorResizableSectionContainer = (props) => {
  const {
    experimentIsFinished,
    handleShowResultsClick,
    operatorDescription,
    operatorIsDataset,
    operatorLogs,
    operatorName,
    operatorStatus,
  } = props;
  const { projectId, experimentId } = useParams();

  useEffect(() => {
    if (experimentId) {
      experimentIsFinished(experimentId);
    }
  }, [projectId, experimentId, experimentIsFinished]);

  const resizableContent = operatorName ? (
    <>
      {/* rendering data set drawer */}
      {operatorIsDataset && <DatasetDrawerContainer />}

      <div
        style={{
          overflowY: 'auto',
          borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
        }}
      >
        {/* rendering generic drawer */}
        {!operatorIsDataset && <GenericDrawerContainer />}
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.09)',
        }}
      >
        {/* rendering operator's notebook logger */}
        {!operatorIsDataset && operatorStatus === 'Failed' && (
          <InputBlockContainer
            title='Erro na execução'
            tip='Veja o código no Jupyter para mais detalhes sobre a execução'
            error='true'
            status={operatorStatus}
          >
            <OperatorLogBlock logContent={operatorLogs} />
          </InputBlockContainer>
        )}

        <InputBlockContainer>
          {/* rendering results button bar */}
          {!operatorIsDataset && (
            <ResultsButtonBar
              handleEditClick={() => undefined}
              handleResultsClick={handleShowResultsClick}
              // always show results button
              showingResults={false}
              disabled={!experimentIsFinished}
            />
          )}

          {/* rendering link to Jupyter */}
          {!operatorIsDataset && <NotebookOutputsContainer />}
        </InputBlockContainer>
      </div>
    </>
  ) : undefined;

  return (
    <PropertiesPanel
      resizableContent={resizableContent}
      tip={operatorDescription}
      title={operatorName}
    />
  );
};

// PROP TYPES
OperatorResizableSectionContainer.propTypes = {
  /** Operator parent experiment is finished */
  experimentIsFinished: PropTypes.bool.isRequired,
  /** Show results button click handler */
  handleShowResultsClick: PropTypes.func.isRequired,
  /** Operator description */
  operatorDescription: PropTypes.string,
  /** Operator is a dataset operator */
  operatorIsDataset: PropTypes.bool.isRequired,
  /** Operator logs */
  operatorLogs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Operator name */
  operatorName: PropTypes.string.isRequired,
  /** Operator status */
  operatorStatus: PropTypes.string,
};

// DEFAULT PROPS
OperatorResizableSectionContainer.defaultProps = {
  operatorDescription: undefined,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperatorResizableSectionContainer);
