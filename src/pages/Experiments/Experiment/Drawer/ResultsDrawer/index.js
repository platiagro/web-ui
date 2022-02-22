import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin, Card, Col } from 'antd';
import { LoadingOutlined, DownloadOutlined } from '@ant-design/icons';

import PlotResult from './PlotResult';

import useGridLayout from './useGridLayout';
import useMoveOrResize from './useMoveOrResize';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Skeleton } from 'uiComponents';
//import { CommonTable } from 'components';

import './ResultsDrawer.less';
import Button from 'antd/es/button';

const ReactGridLayout = WidthProvider(RGL);

const ResultsDrawer = ({
  dataset,
  figures,
  isToShowDownloadButtons,
  loading,
  parameters,
  handleDownloadResult,
}) => {
  const gridLayout = useGridLayout(figures);
  const handleMoveOrResize = useMoveOrResize(figures);

  const hasResult = useMemo(() => {
    return figures.length > 0 || parameters.length > 0 || dataset;
  }, [dataset, figures.length, parameters.length]);

  if (loading) {
    return (
      <div className='resultsDrawer'>
        <Spin indicator={<LoadingOutlined />} />
      </div>
    );
  }

  if (!hasResult) {
    return (
      <div className='resultsDrawer'>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não existem resultados!'
        />
      </div>
    );
  }

  return (
    <div className='resultsDrawer'>
      {isToShowDownloadButtons && (
        <Button
          className='download-result-button'
          onClick={handleDownloadResult}
          type='default'
        >
          <DownloadOutlined />
          <span>Fazer download do resultado</span>
        </Button>
      )}
      <ReactGridLayout
        layout={gridLayout}
        rowHeight={35}
        cols={12}
        onDragStop={handleMoveOrResize}
        onResizeStop={handleMoveOrResize}
        containerPadding={[30, 30]}
      >
        {figures.map((result) => {
          return (
            <Col span={12} key={result.uuid}>
              <Card
                title={
                  <Skeleton paragraphConfig={{ rows: 1, width: '100%' }} />
                }
                style={{ height: 450, overflowX: 'scroll' }}
              >
                <PlotResult plotUrl={result.plotUrl} />
              </Card>
            </Col>
          );
        })}
      </ReactGridLayout>
    </div>
  );
};

ResultsDrawer.propTypes = {
  dataset: PropTypes.object,
  figures: PropTypes.array.isRequired,
  isToShowDownloadButtons: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  parameters: PropTypes.array,
  handleDownloadResult: PropTypes.func,
};

ResultsDrawer.defaultProps = {
  activeKey: '1',
  scroll: undefined,
  resultsTabStyle: undefined,
  onTabChange: undefined,
};

export default ResultsDrawer;
