// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import { Modal, Skeleton } from 'uiComponents';
import CompareResultItem from './CompareResultItem';

// ACTIONS
import { changeVisibilityCompareResultsModal } from 'store/ui/actions';
import {
  addCompareResult,
  deleteCompareResult,
  fetchCompareResults,
  updateCompareResult,
} from 'store/compareResults/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCompareResult: () => {
      dispatch(addCompareResult());
    },
    handleChangeVisibilityCompareResultsModal: () => {
      dispatch(changeVisibilityCompareResultsModal(false));
    },
    handleDeleteCompareResult: (id) => {
      dispatch(deleteCompareResult(id));
    },
    handleFetchCompareResults: () => {
      dispatch(fetchCompareResults());
    },
    handleUpdateCompareResult: (compareResult) => {
      dispatch(updateCompareResult(compareResult));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    addIsLoading: state.compareResultsReducer.addIsLoading,
    compareResults: state.compareResultsReducer.compareResults,
    deleteIsLoading: state.compareResultsReducer.deleteIsLoading,
    experiments: state.experimentsReducer,
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
    handleUpdateCompareResult,
  } = props;

  useEffect(() => {
    if (isVisible) {
      handleFetchCompareResults();
    }
  }, [isVisible]);

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

  const loadingCard = () => {
    return (
      <Col span={12}>
        <Card
          title={<Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />}
          style={{ height: 450, overflowX: 'scroll' }}
        >
          <Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />
          <CommonTable
            columns={['', '', '', '']}
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

  const renderCompareResultItem = () => {
    if (compareResults.length === 0) {
      return;
    }

    return compareResults.map((compareResult) => {
      return (
        <Col span={12}>
          <CompareResultItem
            compareResult={compareResult}
            experiments={experiments}
            experimentsTrainingHistory={experimentsTrainingHistory}
            onDelete={handleDeleteCompareResult}
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
          loadingCard()
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
                  onClick={handleAddCompareResult}
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
  /** Operator results modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Operator results modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Operator experiment metrics*/
  operatorMetrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator parameters */
  operatorParameters: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator parameters latest training*/
  operatorParametersLatestTraining: PropTypes.object.isRequired,
  /** Operator experiment metrics is loading */
  operatorMetricsLoading: PropTypes.bool.isRequired,
  /** Operator experiment results */
  operatorResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Operator experiment results is loading */
  operatorResultsLoading: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareResultsModalContainer);
