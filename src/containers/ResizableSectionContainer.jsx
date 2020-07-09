// REACT LIBS
import React from 'react';
import { connect } from 'react-redux';

// UI LIBS
import { Divider } from 'antd';

// COMPONENTS
import ResizableSection from '../components/ResizableSection/ResizableSection';
import DatasetDrawerContainer from '../components/Content/ProjectContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from '../components/Content/ProjectContent/Experiment/Drawer/GenericDrawer/_/Container';
import ResultsDrawer from '../components/Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';
import ResultsButtonBar from '../components/Content/ProjectContent/Experiment/Drawer/ResultsButtonBar';
import NotebookOutputsContainer from '../components/Content/ProjectContent/Experiment/Drawer/NotebookOutputs/_/Container';

// ACTIONS
import {
  hideDrawer,
  showDrawerResults,
  hideDrawerResults,
} from '../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // hide drawer action
    handleHideDrawer: () => dispatch(hideDrawer()),
    // hide drawer results action
    handleEditClick: () => dispatch(hideDrawerResults()),
    // show drawer results action
    handleResultsClick: () => dispatch(showDrawerResults()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operator: state.operatorReducer,
    drawer: state.uiReducer.drawer,
    showResults: state.uiReducer.drawer.showResults,
    results: state.operatorReducer.results,
    metrics: state.operatorReducer.metrics,
    resultsLoading: state.uiReducer.operatorResults.loading,
    metricsLoading: state.uiReducer.operatorMetrics.loading,
    experimentTrained: state.experimentReducer.succeeded,
    isDataset: state.operatorReducer.name === 'Conjunto de dados',
  };
};

// MOCKS
// placeholder
const placeholder = (
  <p style={{ textAlign: 'center' }}>
    Selecione um operador para visualizar ou editar os parâmetros.
  </p>
);

// CONTAINER
const ResizableSectionContainer = ({
  operator,
  results,
  metrics,
  resultsLoading,
  metricsLoading,
  isDataset,
  showResults,
  handleEditClick,
  handleResultsClick,
  experimentTrained,
}) => (
  <ResizableSection placeholder={placeholder} title={operator.name}>
    {/* rendering data set drawer */}
    {isDataset && <DatasetDrawerContainer />}
    {/* rendering generic drawer */}
    {!isDataset && !showResults && <GenericDrawerContainer />}
    {/* rendering results drawer */}
    {showResults && (
      <ResultsDrawer
        loading={resultsLoading}
        metricsLoading={metricsLoading}
        metrics={metrics}
        results={results}
      />
    )}
    {/* divider */}
    <Divider />

    {/* rendering results button bar */}
    {!isDataset && (
      <ResultsButtonBar
        handleEditClick={handleEditClick}
        handleResultsClick={handleResultsClick}
        showingResults={showResults}
        disabled={
          !results || (!experimentTrained && results && results.lenght <= 0)
        }
      />
    )}

    {/* rendering link to Jupyter */}
    {!isDataset && !showResults && <NotebookOutputsContainer />}
  </ResizableSection>
);

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResizableSectionContainer);
