// REACT LIBS
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';

// UI LIBS
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space } from 'antd';

// COMPONENTS
import { CommonTable, CompareResultItem } from 'components';
import { Modal, Skeleton } from 'uiComponents';

// ACTIONS
import { changeVisibilityCompareResultsModal } from 'store/ui/actions';
import {
  addCompareResult,
  deleteCompareResult,
  fetchCompareResults,
  fetchCompareResultsResults,
  fetchTrainingHistory,
  updateCompareResult,
} from 'store/compareResults/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCompareResult: (projectId) => {
      dispatch(addCompareResult(projectId));
    },
    handleChangeVisibilityCompareResultsModal: () => {
      dispatch(changeVisibilityCompareResultsModal(false));
    },
    handleDeleteCompareResult: (projectId, id) => {
      dispatch(deleteCompareResult(projectId, id));
    },
    handleFetchCompareResults: (projectId, experiments) => {
      dispatch(fetchCompareResults(projectId, experiments));
    },
    handleFetchCompareResultsResults: (compareResult) => {
      dispatch(fetchCompareResultsResults(compareResult));
    },
    handleFetchTrainingHistory: (experimentId) => {
      dispatch(fetchTrainingHistory(experimentId));
    },
    handleUpdateCompareResult: (compareResult, changedPosition) => {
      dispatch(updateCompareResult(compareResult, changedPosition));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    addIsLoading: state.uiReducer.compareResultsModal.addIsLoading,
    compareResults: state.compareResultsReducer.compareResults,
    deleteIsLoading: state.uiReducer.compareResultsModal.deleteIsLoading,
    experiments: state.experimentsReducer,
    experimentsOptions: state.compareResultsReducer.experimentsOptions,
    experimentsTrainingHistory:
      state.compareResultsReducer.experimentsTrainingHistory,
    isLoading: state.uiReducer.compareResultsModal.loading,
    isVisible: state.uiReducer.compareResultsModal.isVisible,
    tasks: state.tasksReducer.tasks,
  };
};

/**
 * Container to display operator experiment results modal.
 */
const CompareResultsModalContainer = (props) => {
  const {
    addIsLoading,
    compareResults,
    deleteIsLoading,
    experiments,
    experimentsOptions,
    experimentsTrainingHistory,
    isLoading,
    isVisible,
    tasks,
  } = props;
  const {
    handleAddCompareResult,
    handleChangeVisibilityCompareResultsModal,
    handleDeleteCompareResult,
    handleFetchCompareResults,
    handleFetchCompareResultsResults,
    handleFetchTrainingHistory,
    handleUpdateCompareResult,
  } = props;

  const { projectId } = useParams();
  const [compareResultCards, setCompareResultCards] = useState([]);

  useEffect(() => {
    if (isVisible) {
      handleFetchCompareResults(projectId, experiments);
    }
  }, [experiments, handleFetchCompareResults, isVisible, projectId]);

  useEffect(() => {
    if (compareResults) {
      setCompareResultCards(compareResults);
    }
  }, [compareResults]);

  const title = (
    <>
      <Space>
        <span>
          <strong>Comparar resultados</strong>
        </span>
        <Divider type='vertical' />
        <Button shape='round' type='primary-inverse' disabled>
          <DownloadOutlined />
          Fazer download
        </Button>
      </Space>
    </>
  );

  const renderLoadingCard = () => {
    return (
      <Col key={uuidv4()} span={12}>
        <Card
          title={<Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />}
          style={{ height: 450, overflowX: 'scroll' }}
        >
          <Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />
          <CommonTable
            columns={[
              { title: '' },
              { title: '' },
              { title: '' },
              { title: '' },
            ]}
            isLoading={true}
            rowKey={() => {
              return uuidv4();
            }}
            size={'small'}
            skeletonRowsAmount={5}
          />
        </Card>
      </Col>
    );
  };

  const handleMoveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = compareResultCards[dragIndex];
      setCompareResultCards(
        update(compareResultCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [compareResultCards]
  );

  const renderCompareResultItem = () => {
    if (compareResultCards.length === 0) {
      return;
    }

    return compareResultCards.map((compareResult, index) => {
      return (
        <Col key={compareResult.uuid} span={12}>
          <CompareResultItem
            cardIndex={index}
            compareResult={compareResult}
            experiments={experiments}
            experimentsOptions={experimentsOptions}
            experimentsTrainingHistory={experimentsTrainingHistory}
            onDelete={(id) => {
              handleDeleteCompareResult(projectId, id);
            }}
            onFetchResults={handleFetchCompareResultsResults}
            onLoadTrainingHistory={handleFetchTrainingHistory}
            onMoveCard={handleMoveCard}
            onUpdate={handleUpdateCompareResult}
            tasks={tasks}
          />
        </Col>
      );
    });
  };

  return (
    <Modal
      bodyStyle={{
        backgroundColor: '#ECEFF1',
        height: '80vh',
        overflowX: 'scroll',
      }}
      footer={null}
      handleClose={handleChangeVisibilityCompareResultsModal}
      isFullScreen={false}
      isVisible={isVisible}
      title={title}
      width={'90%'}
    >
      <Row gutter={[8, 8]}>
        {isLoading || deleteIsLoading ? (
          renderLoadingCard()
        ) : (
          <>
            {renderCompareResultItem()}
            <Col span={12}>
              <Card
                style={{
                  border: '2px dashed #D9D9D9',
                  textAlign: 'center',
                }}
              >
                <Button
                  shape='round'
                  type='default'
                  disabled={addIsLoading}
                  onClick={() => {
                    handleAddCompareResult(projectId);
                  }}
                >
                  <Space style={{ color: '#0050B3' }}>
                    {addIsLoading ? <LoadingOutlined /> : <PlusOutlined />}
                    Adicionar resultado
                  </Space>
                </Button>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
};

CompareResultsModalContainer.propTypes = {
  /** Compare result add is loading */
  addIsLoading: PropTypes.bool.isRequired,
  /** The compare results */
  compareResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Compare result delete is loading */
  deleteIsLoading: PropTypes.bool.isRequired,
  /** The expriment options to use on Cascader */
  experimentsOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** The expriments training history */
  experimentsTrainingHistory: PropTypes.object.isRequired,
  /** Function to handle add compare result */
  handleAddCompareResult: PropTypes.func.isRequired,
  /** Function to handle change visibility compare result modal */
  handleChangeVisibilityCompareResultsModal: PropTypes.func.isRequired,
  /** Function to handle delete compare result */
  handleDeleteCompareResult: PropTypes.func.isRequired,
  /** Function to handle fetch compare results */
  handleFetchCompareResults: PropTypes.func.isRequired,
  /** Function to handle fetch compare results results */
  handleFetchCompareResultsResults: PropTypes.func.isRequired,
  /** Function to handle fetch training history */
  handleFetchTrainingHistory: PropTypes.func.isRequired,
  /** Function to handle update compare result */
  handleUpdateCompareResult: PropTypes.func.isRequired,
  /** Modal is loading */
  isLoading: PropTypes.bool.isRequired,
  /** Modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareResultsModalContainer);
