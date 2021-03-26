// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { PropertiesPanel } from 'components';
import OperatorLogBlock from 'components/LogBlock';
import DatasetDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/GenericDrawer/_/Container';
import NotebookOutputsContainer from 'components/Content/ExperimentsContent/Experiment/Drawer/NotebookOutputs/_/Container';
import PropertyBlock from 'components/PropertyBlock';
import ResultsButtonBar from 'components/Content/ExperimentsContent/Experiment/Drawer/ResultsButtonBar';

// ACTIONS
import { getExperimentById } from 'store/experiments/experimentsReducer';
import { showOperatorResults } from 'store/ui/actions';

// STYLES
import './OperatorResizableSectionContainer.less';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowResultsClick: () => dispatch(showOperatorResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    checkExperimentIsFinished: (experimentId) => {
      const experiment = getExperimentById(state, experimentId);
      if ('succeded' in experiment) return experiment.succeded;
      return false;
    },
    operatorDescription: state.operatorReducer.description,
    operatorIsDataset: state.operatorReducer.tags
      ? state.operatorReducer.tags.includes('DATASETS')
      : false,
    showExperimentResults: state.uiReducer.operatorResults.showOperatorResults,
    operatorLogs: state.operatorReducer.logs,
    operatorName: state.operatorReducer.name,
    operatorStatus: state.operatorReducer.status,
    resultsButtonBarLoading:
      state.uiReducer.operatorResults.resultsButtonBarLoading,
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
    handleShowResultsClick,
    operatorDescription,
    operatorIsDataset,
    operatorLogs,
    operatorName,
    operatorStatus,
    resultsButtonBarLoading,
  } = props;

  const propertiesContent = operatorName ? (
    <>
      {/* rendering data set drawer */}
      {operatorIsDataset && <DatasetDrawerContainer />}

      <div className='operatorResizableSectionDrawer'>
        {/* rendering generic drawer */}
        {!operatorIsDataset && <GenericDrawerContainer />}
      </div>

      <div className='operatorResizableSectionLogs'>
        {/* rendering operator's notebook logger */}
        {!operatorIsDataset && operatorStatus === 'Failed' && (
          <PropertyBlock
            title='Erro na execução'
            tip='Veja o código no Jupyter para mais detalhes sobre a execução'
            error='true'
            status={operatorStatus}
          >
            <OperatorLogBlock logContent={operatorLogs} />
          </PropertyBlock>
        )}

        <PropertyBlock>
          {/* rendering results button bar */}
          {!operatorIsDataset && (
            <ResultsButtonBar
              handleEditClick={() => undefined}
              handleResultsClick={handleShowResultsClick}
              // always show results button
              showingResults={false}
              loading={resultsButtonBarLoading}
            />
          )}

          {/* rendering link to Jupyter */}
          {!operatorIsDataset && <NotebookOutputsContainer />}
        </PropertyBlock>
      </div>
    </>
  ) : undefined;

  return (
    <PropertiesPanel tip={operatorDescription} title={operatorName}>
      {propertiesContent}
    </PropertiesPanel>
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
