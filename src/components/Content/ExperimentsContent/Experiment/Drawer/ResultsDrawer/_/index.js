// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin, Tabs } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import TagResult from '../TagResult';
import TableResult from '../TableResult';
import PlotResult from '../PlotResult';
import MetricsTitle from './MetricsTitle';

// CONTAINERS
import { DownloadOperatorDatasetContainer } from 'containers';

// STYLES
import './ResultsDrawer.less';

// DESTRUCTURING TABS
const { TabPane } = Tabs;

// RESULTS TYPES
const resultsTypes = {
  // tag
  tag: ({ uuid, ...props }) => <TagResult key={uuid} {...props} />,
  // table
  table: ({ uuid, ...props }, onPageChange) => (
    <TableResult key={uuid} onPageChange={onPageChange} {...props} />
  ),
  // plot
  plot: ({ uuid, ...props }) => <PlotResult key={uuid} {...props} />,
};

/**
 * Results Drawer.
 * This component is responsible for displaying drawer with results.
 *
 * @param {object} props Component props
 * @returns {ResultsDrawer} React component
 */
const ResultsDrawer = (props) => {
  const {
    isToShowDownloadButtons,
    loading,
    metrics,
    metricsLoading,
    onDatasetPageChange,
    parameters,
    results,
    resultsTabStyle,
    scroll,
  } = props;
  // metrics data source
  const dataSource = metrics.map((element, i) => {
    const objectKey = Object.keys(element)[0];
    const objectValor = element[objectKey];
    const obj = {
      key: i,
      metrica: objectKey,
      valor: JSON.stringify(objectValor),
    };
    return obj;
  });

  // metrics columns
  const columns = [
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

  // parameters columns
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

  return (
    <div className='resultsDrawer'>
      {loading ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : results.length > 0 || metrics.length > 0 || parameters.length > 0 ? (
        <>
          <Tabs defaultActiveKey='1'>
            {/* results */}
            <TabPane tab='Resultados' key='1'>
              <div style={resultsTabStyle}>
                {results.map((result) => (
                  <div className='tab-content' key={result.uuid}>
                    {resultsTypes[result.type](result, onDatasetPageChange)}
                  </div>
                ))}
              </div>
              {isToShowDownloadButtons ? (
                <DownloadOperatorDatasetContainer />
              ) : null}
            </TabPane>

            {/* metrics */}
            <TabPane
              tab={<MetricsTitle loading={metricsLoading} />}
              key='2'
              disabled={metrics.length <= 0}
            >
              <CommonTable
                bordered
                columns={columns}
                dataSource={dataSource}
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
              key='3'
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
        </>
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
  /** Show download buttons */
  isToShowDownloadButtons: PropTypes.bool,
  /** Results drawer is loading */
  loading: PropTypes.bool.isRequired,
  /** Metrics list */
  metrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Metrics is loading */
  metricsLoading: PropTypes.bool.isRequired,
  /** Training parameters */
  parameters: PropTypes.arrayOf(PropTypes.object),
  /** Results list */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** CSS style for results tab */
  resultsTabStyle: PropTypes.object,
  /** Table scroll config */
  scroll: PropTypes.object,
};

ResultsDrawer.defaultProps = {
  /** Table scroll config */
  scroll: undefined,
};

// EXPORT
export default ResultsDrawer;
