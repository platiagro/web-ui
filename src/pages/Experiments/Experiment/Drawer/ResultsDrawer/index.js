import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Empty, Tabs } from 'antd';
//import { LoadingOutlined } from '@ant-design/icons';
import { OperatorResultItem, CommonTable } from 'components';
import { DownloadOperatorDatasetContainer } from 'containers';
import TableResult from './TableResult';

import useGridLayout from './useGridLayout';
import { ADD_CARD_KEY } from './constants';
import useMoveOrResize from './useMoveOrResize';
import ResultsDrawerAddCard from './ResultsDrawerAddCard';
import ResultsDrawerSkeleton from './ResultsDrawerSkeleton';
import RGL, { WidthProvider } from 'react-grid-layout';

import './ResultsDrawer.less';

const ReactGridLayout = WidthProvider(RGL);

const ResultsDrawer = ({
  dataset,
  figures,
  loading,
  activeKey,
  parameters,
  datasetScroll,
  selectedResults,
  onTabChange,
  handleSelectResult,
  onDatasetPageChange,
  isToShowDownloadButtons,
}) => {
  const [showingFigures, setShowingFigures] = useState([]);

  const gridLayout = useGridLayout(showingFigures);
  const handleMoveOrResize = useMoveOrResize(showingFigures);

  const hasResult = useMemo(() => {
    return figures.length > 0 || parameters.length > 0 || dataset;
  }, [dataset, figures.length, parameters.length]);

  const handleRemoveFigure = (id) => {
    setShowingFigures((currentFigures) => {
      return currentFigures.filter((figure) => figure.id !== id);
    });
  };

  const parametersColumns = [
    {
      title: 'Parâmetro',
      dataIndex: 'name',
      key: 'parameter',
      render(val) {
        return <span style={{ fontWeight: 'bold' }}>{val}</span>;
      },
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render(val) {
        return <span style={{ fontFamily: 'monospace' }}>{val}</span>;
      },
    },
  ];

  const handleAddFigure = () => {
    setShowingFigures((currentFigures) => {
      const currentFiguresClone = [...currentFigures];
      currentFiguresClone.push({
        id: `${currentFiguresClone.length}`,
      });
      return currentFiguresClone;
    });
  };

  const handleSelectFigure = (id, selectedFigure) => {
    setShowingFigures((currentFigures) => {
      const currentFiguresClone = [...currentFigures];

      const indexToUpdate = currentFiguresClone.findIndex(
        (figure) => figure.id === id
      );
      const figure = currentFiguresClone[indexToUpdate];
      figure.selectedFigure = selectedFigure;

      currentFiguresClone.splice(indexToUpdate, 1, figure);

      return currentFiguresClone;
    });
  };

  useEffect(() => {
    if (figures?.length) {
      setShowingFigures(
        figures.map((_, index) => ({
          id: `${index}`,
          selectedFigure: index,
        }))
      );
    }
  }, [figures]);

  if (loading) {
    return (
      <div className='results-drawer'>
        <ResultsDrawerSkeleton />
      </div>
    );
  }

  if (!hasResult) {
    return (
      <div className='results-drawer'>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não existem resultados!'
        />
      </div>
    );
  }

  return (
    <div className='results-drawer'>
      <ReactGridLayout
        className='results-drawer-react-grid'
        layout={gridLayout}
        cols={12}
        rowHeight={35}
        onDragStop={handleMoveOrResize}
        onResizeStop={handleMoveOrResize}
        containerPadding={[8, 8]}
      >
        {showingFigures.map(({ id, selectedFigure }) => {
          return (
            <div key={id}>
              <OperatorResultItem
                cardId={id}
                figures={figures}
                selectedFigure={selectedFigure}
                isSelected={!!selectedResults[id]}
                handleSelectResult={handleSelectResult}
                handleRemoveFigure={handleRemoveFigure}
                handleSelectFigure={handleSelectFigure}
              />
            </div>
          );
        })}

        <div key={ADD_CARD_KEY}>
          <ResultsDrawerAddCard handleAddFigure={handleAddFigure} />
        </div>
      </ReactGridLayout>

      <div>
        <Tabs defaultActiveKey={activeKey} onChange={onTabChange}>
          <Tabs.TabPane
            disabled={!dataset}
            key={figures.length + 1}
            tab={<span>Dataset</span>}
          >
            {!!dataset && (
              <TableResult
                key={dataset.uuid}
                rows={dataset.rows}
                total={dataset.total}
                scroll={datasetScroll}
                columns={dataset.columns}
                pageSize={dataset.pageSize}
                currentPage={dataset.currentPage}
                onPageChange={onDatasetPageChange}
              />
            )}

            {isToShowDownloadButtons && <DownloadOperatorDatasetContainer />}
          </Tabs.TabPane>

          <Tabs.TabPane
            key={figures.length + 3}
            tab={<span>Parâmetros</span>}
            disabled={parameters.length <= 0}
          >
            <CommonTable
              scroll={scroll}
              isLoading={false}
              dataSource={parameters}
              columns={parametersColumns}
              rowKey={(record) => record.name}
              bordered
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

ResultsDrawer.propTypes = {
  dataset: PropTypes.object,
  figures: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  parameters: PropTypes.array,
  datasetScroll: PropTypes.object,
  onDatasetPageChange: PropTypes.func.isRequired,
  isToShowDownloadButtons: PropTypes.bool,
  activeKey: PropTypes.string,
  onTabChange: PropTypes.func,
  selectedResults: PropTypes.object.isRequired,
  handleSelectResult: PropTypes.func.isRequired,
};

ResultsDrawer.defaultProps = {
  activeKey: '1',
  scroll: undefined,
  resultsTabStyle: undefined,
  onTabChange: undefined,
};

export default ResultsDrawer;
