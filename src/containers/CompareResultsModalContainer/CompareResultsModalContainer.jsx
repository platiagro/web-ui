// REACT LIBS
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
  createCompareResultRequest,
  deleteCompareResultRequest,
  fetchCompareResults,
  fetchCompareResultsResults,
  fetchTrainingHistory,
  updateCompareResult,
} from 'store/compareResults/actions';

// STYLES
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateCompareResult: (projectId) => {
      dispatch(createCompareResultRequest(projectId));
    },
    handleChangeVisibilityCompareResultsModal: () => {
      dispatch(changeVisibilityCompareResultsModal(false));
    },
    handleDeleteCompareResult: (projectId, id) => {
      dispatch(deleteCompareResultRequest(projectId, id));
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

const ADD_COMPARE_RESULT_GRID_KEY = 'add-compare-result-grid-key';
const ReactGridLayout = WidthProvider(RGL);

/**
 * Container to display operator experiment results modal.
 *
 * @param props
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
    handleCreateCompareResult,
    handleChangeVisibilityCompareResultsModal,
    handleDeleteCompareResult,
    handleFetchCompareResults,
    handleFetchCompareResultsResults,
    handleFetchTrainingHistory,
    handleUpdateCompareResult,
  } = props;

  const { projectId } = useParams();

  useEffect(() => {
    if (isVisible) {
      handleFetchCompareResults(projectId, experiments);
    }
  }, [experiments, handleFetchCompareResults, isVisible, projectId]);

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

  const renderCompareResultItem = () => {
    return compareResults.map((compareResult) => {
      return (
        <div key={compareResult.uuid}>
          <CompareResultItem
            compareResult={compareResult}
            experiments={experiments}
            experimentsOptions={experimentsOptions}
            experimentsTrainingHistory={experimentsTrainingHistory}
            onDelete={(id) => {
              handleDeleteCompareResult(projectId, id);
            }}
            onFetchResults={handleFetchCompareResultsResults}
            onLoadTrainingHistory={handleFetchTrainingHistory}
            onUpdate={handleUpdateCompareResult}
            tasks={tasks}
          />
        </div>
      );
    });
  };

  const generateGridLayout = () => {
    let totalW = 0;
    const gridLayout = compareResults.map((item, i) => {
      let itemLayout = item.layout;
      if (!itemLayout) {
        itemLayout = {
          x: (Math.floor(totalW / 6) % 2) * 6,
          y: 9999,
          w: 6,
          h: 12,
        };
      }
      totalW += itemLayout.w;
      itemLayout.i = item.uuid;
      itemLayout.minW = 6;
      itemLayout.minH = 12;
      return itemLayout;
    });
    gridLayout.push({
      i: ADD_COMPARE_RESULT_GRID_KEY,
      x: (Math.floor(totalW / 6) % 2) * 6,
      y: 99999,
      w: 6,
      h: 2,
      isBounded: true,
      isDraggable: true,
      isResizable: false,
    });
    return gridLayout;
  };

  const handleUpdateCompareResultLayout = (layout, oldItem, newItem) => {
    if (newItem.i !== ADD_COMPARE_RESULT_GRID_KEY) {
      for (const layoutItem of layout) {
        if (layoutItem.i !== ADD_COMPARE_RESULT_GRID_KEY) {
          let compareResult = compareResults.find(
            (e) => e.uuid === layoutItem.i
          );
          compareResult.layout = {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
          handleUpdateCompareResult(compareResult, true);
        }
      }
    }
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
      {isLoading || deleteIsLoading ? (
        <Row gutter={[8, 8]}>{renderLoadingCard()}</Row>
      ) : (
        <ReactGridLayout
          className={'layout'}
          cols={12}
          layout={generateGridLayout()}
          rowHeight={35}
          onDragStop={handleUpdateCompareResultLayout}
          onResizeStop={handleUpdateCompareResultLayout}
        >
          {renderCompareResultItem()}
          <div key={ADD_COMPARE_RESULT_GRID_KEY}>
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
                  handleCreateCompareResult(projectId);
                }}
              >
                <Space style={{ color: '#0050B3' }}>
                  {addIsLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  Adicionar resultado
                </Space>
              </Button>
            </Card>
          </div>
        </ReactGridLayout>
      )}
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
  handlecreateCompareResultRequest: PropTypes.func.isRequired,
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
