// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { ResizableSection } from 'components';
import DatasetDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/DatasetDrawer/_/Container';
import GenericDrawerContainer from '../Content/ProjectContent/Experiment/Drawer/GenericDrawer/_/Container';
import ResultsButtonBar from '../Content/ProjectContent/Experiment/Drawer/ResultsButtonBar';
import NotebookOutputsContainer from '../Content/ProjectContent/Experiment/Drawer/NotebookOutputs/_/Container';
import InputBlockContainer from 'components/InputBlockContainer';
import OperatorLogBlock from 'components/LogBlock';

/**
 * Component to display experiment flow operator parameters, results and metrics.
 *
 * @param {object} props Component props
 * @returns {OperatorResizableSection} Component
 * @component
 * @example
 * // operator name
 * const operatorName = 'Component Test';
 *
 * // operator experiment results
 * const operatorResults = [];
 *
 * // operator is a dataset operator
 * const operatorIsDataset = false;
 *
 * // operator parent experiment is finished
 * const experimentIsFinished = false;
 *
 * // show results button click handler
 * const handleShowResultsClick = () => alert('ShowResultsClick');
 *
 * // operator description
 * const operatorDescription = 'Description!';
 *
 * // rendering component
 * return (
 *  <div style={{ width: '300px', height: '900px'}}>
 *    <OperatorResizableSection
 *      operatorName={operatorName}
 *      operatorResults={operatorResults}
 *      operatorIsDataset={operatorIsDataset}
 *      experimentIsFinished={experimentIsFinished}
 *      handleShowResultsClick={handleShowResultsClick}
 *      operatorDescription={operatorDescription}
 *      operatorStatus={operatorStatus}
 *    />
 *  </div>
 * )
 */
const OperatorResizableSection = (props) => {
  // destructuring container props
  const {
    // operator name
    operatorName,
    // operator experiment results
    operatorResults,
    // operator is a dataset operator
    operatorIsDataset,
    // operator parent experiment is finished
    experimentIsFinished,
    // show results button click handler
    handleShowResultsClick,
    // operator description
    operatorDescription,
    // operator status
    operatorStatus,
    // operator log
    operatorLogs,
  } = props;

  // placeholder text
  const placeholderText =
    'Selecione uma tarefa para visualizar ou editar os parâmetros.';

  // empty section placeholder
  const emptySectionPlaceholder = (
    <p style={{ textAlign: 'center', padding: '20px' }}>{placeholderText}</p>
  );

  // resizable content
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

      <InputBlockContainer>
        {/* rendering results button bar */}
        {!operatorIsDataset && (
          <ResultsButtonBar
            handleEditClick={() => undefined}
            handleResultsClick={handleShowResultsClick}
            // always show results button
            showingResults={false}
            disabled={
              !operatorResults ||
              (!experimentIsFinished &&
                operatorResults &&
                operatorResults.lenght <= 0)
            }
          />
        )}

        {/* rendering link to Jupyter */}
        {!operatorIsDataset && <NotebookOutputsContainer />}
      </InputBlockContainer>

      {!operatorIsDataset && operatorStatus === 'Failed' && (
        <InputBlockContainer
          title='Erro na Execução'
          tip='Veja o código no Jupyter para mais detalhes sobre a execução'
          error='true'
          status={operatorStatus}
        >
          <OperatorLogBlock logContent={operatorLogs} />
        </InputBlockContainer>
      )}
    </>
  ) : undefined;

  // default title
  const defaultTitle = 'Propriedades';

  // rendering container
  return (
    <ResizableSection
      placeholder={emptySectionPlaceholder}
      title={operatorName || defaultTitle}
      tip={operatorDescription}
    >
      {resizableContent}
    </ResizableSection>
  );
};

// PROP TYPES
OperatorResizableSection.propTypes = {
  /** Operator name */
  operatorName: PropTypes.string.isRequired,
  /** Operator experiment results */
  operatorResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator is a dataset operator */
  operatorIsDataset: PropTypes.bool.isRequired,
  /** Operator parent experiment is finished */
  experimentIsFinished: PropTypes.bool.isRequired,
  /** Show results button click handler */
  handleShowResultsClick: PropTypes.func.isRequired,
  /** Operator description */
  operatorDescription: PropTypes.string,
  /** Operator status */
  operatorStatus: PropTypes.string,
  /** Operator logs */
  operatorLogs: PropTypes.string,
};

// DEFAULT PROPS
OperatorResizableSection.defaultProps = {
  /** Operator description */
  operatorDescription: undefined,
};

// EXPORT DEFAULT
export default OperatorResizableSection;
