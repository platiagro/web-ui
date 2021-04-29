// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin, Tabs } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import TableResult from './TableResult';
import PlotResult from './PlotResult';
import MetricsTitle from './MetricsTitle';

// CONTAINERS
import { DownloadOperatorDatasetContainer } from 'containers';

// STYLES
import './ResultsDrawer.less';

const { TabPane } = Tabs;

const metricsColumns = [
  {
    title: 'Métrica',
    dataIndex: 'metrica',
    key: 'metrica',
    render: (val) => <span style={{ fontWeight: 'bold' }}>{val}</span>,
  },
  {
    title: 'Valor',
    dataIndex: 'valor',
    key: 'valor',
    render: (val) => <span style={{ fontFamily: 'monospace' }}>{val}</span>,
  },
];

const parametersColumns = [
  {
    title: 'Parâmetro',
    dataIndex: 'name',
    key: 'parameter',
    render: (val) => <span style={{ fontWeight: 'bold' }}>{val}</span>,
  },
  {
    title: 'Valor',
    dataIndex: 'value',
    key: 'value',
    render: (val) => <span style={{ fontFamily: 'monospace' }}>{val}</span>,
  },
];

/**
 * Results Drawer.
 * This component is responsible for displaying drawer with results.
 *
 * @param {object} props Component props
 * @returns {ResultsDrawer} React component
 */
const ResultsDrawer = (props) => {
  const {
    activeKey,
    dataset,
    datasetScroll,
    figures,
    isToShowDownloadButtons,
    loading,
    metrics,
    metricsLoading,
    onDatasetPageChange,
    onTabChange,
    parameters,
    resultsTabStyle,
    scroll,
  } = props;

  const metricsDataSource = metrics.map((element, i) => {
    const objectKey = Object.keys(element)[0];
    const objectValor = element[objectKey];
    return {
      key: i,
      metrica: objectKey,
      valor: JSON.stringify(objectValor),
    };
  });

  const hasResult =
    figures.length > 0 ||
    metrics.length > 0 ||
    parameters.length > 0 ||
    dataset;

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
          {/* figures */}
          {figures.map((result, i) => {
            const index = i + 1;
            return (
              <TabPane tab={`Figura ${index}`} key={index}>
                <div style={resultsTabStyle}>
                  <div className='tab-content'>
                    <PlotResult key={result.uuid} plotUrl={result.plotUrl} />
                  </div>
                </div>
              </TabPane>
            );
          })}

          {/* dataset */}
          <TabPane
            tab={<span>Dataset</span>}
            key={figures.length + 1}
            disabled={!dataset}
          >
            {!!dataset && (
              <TableResult
                columns={dataset.columns}
                currentPage={dataset.currentPage}
                key={dataset.uuid}
                onPageChange={onDatasetPageChange}
                pageSize={dataset.pageSize}
                rows={dataset.rows}
                scroll={datasetScroll}
                total={dataset.total}
              />
            )}

            {isToShowDownloadButtons && <DownloadOperatorDatasetContainer />}
          </TabPane>

          {/* metrics */}
          <TabPane
            tab={<MetricsTitle loading={metricsLoading} />}
            key={figures.length + 2}
            disabled={metrics.length <= 0}
          >
            <CommonTable
              bordered
              columns={metricsColumns}
              dataSource={metricsDataSource}
              isLoading={false}
              rowKey={() => {
                return uuidv4();
              }}
              scroll={scroll}
            />
          </TabPane>

          {/* parameters */}
          <TabPane
            tab={<span>Parâmetros</span>}
            key={figures.length + 3}
            disabled={parameters.length <= 0}
          >
            <CommonTable
              bordered
              columns={parametersColumns}
              dataSource={parameters}
              isLoading={false}
              rowKey={() => {
                return uuidv4();
              }}
              scroll={scroll}
            />
          </TabPane>
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

// PROP TYPES
ResultsDrawer.propTypes = {
  /** Tabs active key */
  activeKey: PropTypes.string,
  /** Dataset result  */
  dataset: PropTypes.object,
  /** Dataset scroll config */
  datasetScroll: PropTypes.object,
  /** Figures list  */
  figures: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Show download buttons */
  isToShowDownloadButtons: PropTypes.bool,
  /** Results drawer is loading */
  loading: PropTypes.bool.isRequired,
  /** Metrics list */
  metrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Metrics is loading */
  metricsLoading: PropTypes.bool.isRequired,
  /** Function to handle dataset page change */
  onDatasetPageChange: PropTypes.func.isRequired,
  /** Function to handle tab change */
  onTabChange: PropTypes.func.isRequired,
  /** Training parameters */
  parameters: PropTypes.arrayOf(PropTypes.object),
  /** Table scroll config */
  scroll: PropTypes.object,
};

ResultsDrawer.defaultProps = {
  /** Tabs active key */
  activeKey: '1',
  /** Table scroll config */
  scroll: undefined,
};

// EXPORT
export default ResultsDrawer;
