import React, { useEffect } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  DownloadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space } from 'antd';

import { CommonTable, CompareResultItem } from 'components';
import { Modal, Skeleton } from 'uiComponents';

import {
  addCompareResult,
  deleteCompareResult,
  fetchCompareResults,
  fetchCompareResultsResults,
  fetchTrainingHistory,
  getCompareResultDatasetPaginated,
  updateCompareResult,
} from 'store/compareResults/actions';
import { changeVisibilityCompareResultsModal } from 'store/ui/actions';

import { Selectors } from 'store/projects/experiments';

const { getExperiments } = Selectors;

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ADD_COMPARE_RESULT_GRID_KEY = 'add-compare-result-grid-key';
const ReactGridLayout = WidthProvider(RGL);

/**
 * Container to display operator experiment results modal.
 */
const CompareResultsModalContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // TODO: Criar seletor com reselect
  /* eslint-disable-next-line */
  const experiments = useSelector((state) => getExperiments(state, projectId));

  // TODO: Criar seletores
  /* eslint-disable */
  const addIsLoading = useSelector(
    (state) => state.uiReducer.compareResultsModal.addIsLoading
  );
  const compareResults = useSelector(
    (state) => state.compareResultsReducer.compareResults
  );
  const deleteIsLoading = useSelector(
    (state) => state.uiReducer.compareResultsModal.deleteIsLoading
  );
  const experimentsOptions = useSelector(
    (state) => state.compareResultsReducer.experimentsOptions
  );
  const experimentsTrainingHistory = useSelector(
    (state) => state.compareResultsReducer.experimentsTrainingHistory
  );
  const isLoading = useSelector(
    (state) => state.uiReducer.compareResultsModal.loading
  );
  const isVisible = useSelector(
    (state) => state.uiReducer.compareResultsModal.isVisible
  );
  const tasks = useSelector((state) => state.tasksReducer.tasks);
  /* eslint-enable */

  useEffect(() => {
    if (isVisible) {
      dispatch(fetchCompareResults(projectId));
    }
  }, [dispatch, isVisible, projectId]);

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
              dispatch(deleteCompareResult(projectId, id));
            }}
            onFetchResults={(compareResult) =>
              dispatch(fetchCompareResultsResults(compareResult))
            }
            onResultDatasetPageChange={(compareResult, page, pageSize) =>
              dispatch(
                getCompareResultDatasetPaginated(compareResult, page, pageSize)
              )
            }
            onLoadTrainingHistory={(experimentId) => {
              dispatch(fetchTrainingHistory(projectId, experimentId));
            }}
            onUpdate={(compareResult, isToDispatchAction) =>
              dispatch(updateCompareResult(compareResult, isToDispatchAction))
            }
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
          dispatch(updateCompareResult(compareResult, false));
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
      handleClose={() => dispatch(changeVisibilityCompareResultsModal(false))}
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
                margin: 0,
                textAlign: 'center',
              }}
            >
              <Button
                shape='round'
                type='default'
                disabled={addIsLoading}
                onClick={() => {
                  dispatch(addCompareResult(projectId));
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

export default CompareResultsModalContainer;
