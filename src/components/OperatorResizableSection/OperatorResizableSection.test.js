// REACT LIBS
import React from 'react';

// TEST LIBS
import { shallow } from 'enzyme';

// COMPONENTS
import OperatorResizableSection from './OperatorResizableSection';
import DatasetDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/GenericDrawer/_/Container';
import ResultsDrawer from '../Content/ProjectContent/Experiment/Drawer/ResultsDrawer/_';
import ResultsButtonBar from '../Content/ProjectContent/Experiment/Drawer/ResultsButtonBar';
import NotebookOutputsContainer from '../Content/ProjectContent/Experiment/Drawer/NotebookOutputs/_/Container';

// MOCKS
const mockProps = {
  // operator name
  operatorName: 'Component Test',
  // operator experiment results
  operatorResults: [],
  // operator experiment metrics
  operatorMetrics: [],
  // operator experiment results is loading
  operatorResultsLoading: false,
  // operator experiment metrics is loading
  operatorMetricsLoading: false,
  // operator is a dataset operator
  operatorIsDataset: false,
  // show operator experiment results
  showExperimentResults: false,
  // operator parent experiment is finished
  experimentIsFinished: false,
  // show parameter button click handler
  handleShowParametersClick: () => alert('ShowParametersClick!'),
  // show results button click handler
  handleShowResultsClick: () => alert('ShowResultsClick'),
  // empty section placeholder
  emptySectionPlaceholder: (
    <p style={{ textAlign: 'center' }}>This is a empty section placeholder.</p>
  ),
};
// results drawer component
const resultsDrawerComponent = (
  <ResultsDrawer
    metrics={mockProps.operatorMetrics}
    results={mockProps.operatorResults}
    loading={mockProps.operatorResultsLoading}
    metricsLoading={mockProps.operatorMetricsLoading}
  />
);
// results button bar component
const resultsButtonBarComponent = (showResults) => (
  <ResultsButtonBar
    handleEditClick={mockProps.handleShowParametersClick}
    handleResultsClick={mockProps.handleShowResultsClick}
    showingResults={showResults || mockProps.showExperimentResults}
    disabled={false}
  />
);

// OPERATOR CONTENT TESTS
describe('Operator Content', () => {
  // should render a generic operator content
  it('should render a generic operator content', () => {
    // operator resizable section component
    const operatorResizableSection = shallow(
      <OperatorResizableSection {...mockProps} />
    );

    // expected conditions
    expect(
      operatorResizableSection.contains(<GenericDrawerContainer />)
    ).toBeTruthy();
    expect(
      operatorResizableSection.contains(<NotebookOutputsContainer />)
    ).toBeTruthy();
    expect(
      operatorResizableSection.contains(<DatasetDrawerContainer />)
    ).not.toBeTruthy();
    expect(
      operatorResizableSection.contains(resultsDrawerComponent)
    ).not.toBeTruthy();
  });

  // should render a dataset operator content
  it('should render a dataset operator content', () => {
    // operator is dataset
    const operatorIsDataset = true;

    // operator resizable section component
    const operatorResizableSection = shallow(
      <OperatorResizableSection
        {...mockProps}
        operatorIsDataset={operatorIsDataset}
      />
    );

    // expected conditions
    expect(
      operatorResizableSection.contains(<DatasetDrawerContainer />)
    ).toBeTruthy();
    expect(
      operatorResizableSection.contains(<NotebookOutputsContainer />)
    ).not.toBeTruthy();
    expect(
      operatorResizableSection.contains(resultsButtonBarComponent())
    ).not.toBeTruthy();
    expect(
      operatorResizableSection.contains(<GenericDrawerContainer />)
    ).not.toBeTruthy();
    expect(
      operatorResizableSection.contains(resultsDrawerComponent)
    ).not.toBeTruthy();
  });
});

// TODO: SNAPSHOT TESTS
