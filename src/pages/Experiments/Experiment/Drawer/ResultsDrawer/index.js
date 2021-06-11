import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Empty, Spin, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { CommonTable } from 'components';
import { DownloadOperatorDatasetContainer } from 'containers';

import PlotResult from './PlotResult';
import TableResult from './TableResult';

import './ResultsDrawer.less';

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

const ResultsDrawer = (props) => {
  const {
    activeKey,
    dataset,
    datasetScroll,
    figures,
    isToShowDownloadButtons,
    loading,
    onDatasetPageChange,
    onTabChange,
    parameters,
    resultsTabStyle,
    scroll,
  } = props;

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

  return (
    <div className='resultsDrawer'>
      {hasResult ? (
        <Tabs defaultActiveKey={activeKey} onChange={onTabChange}>
          {figures.map((result, i) => {
            const index = i + 1;
            return (
              <Tabs.TabPane tab={`Figura ${index}`} key={index}>
                <div style={resultsTabStyle}>
                  <div className='tab-content'>
                    <PlotResult key={result.uuid} plotUrl={result.plotUrl} />
                  </div>
                </div>
              </Tabs.TabPane>
            );
          })}

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
              rowKey={(data, index) => data.name || `result-${index}`}
              bordered
            />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não existem resultados!'
        />
      )}
    </div>
  );
};

ResultsDrawer.propTypes = {
  activeKey: PropTypes.string,
  dataset: PropTypes.object,
  datasetScroll: PropTypes.object,
  figures: PropTypes.arrayOf(PropTypes.object).isRequired,
  isToShowDownloadButtons: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onDatasetPageChange: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  parameters: PropTypes.arrayOf(PropTypes.object),
  scroll: PropTypes.object,
  resultsTabStyle: PropTypes.object,
};

ResultsDrawer.defaultProps = {
  activeKey: '1',
  scroll: undefined,
  resultsTabStyle: undefined,
};

export default ResultsDrawer;
