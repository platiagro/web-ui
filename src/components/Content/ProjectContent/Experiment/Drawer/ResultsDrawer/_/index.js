// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Divider, Spin, Icon, Table, Tabs, Empty } from 'antd';

// COMPONENTS
import TagResult from '../TagResult';
import TableResult from '../TableResult/Container';
// import TableResult from '../TableResult';
import PlotResult from '../PlotResult';
import MetricsTitle from './MetricsTitle';

// DESTRUCTURING TABS
const { TabPane } = Tabs;

// RESULTS TYPES
const resultsTypes = {
  // tag
  tag: ({ uuid, ...props }) => <TagResult key={uuid} {...props} />,
  // table
  table: ({ uuid, ...props }) => <TableResult key={uuid} {...props} />,
  // plot
  plot: ({ uuid, ...props }) => <PlotResult key={uuid} {...props} />,
};

/**
 * Results Drawer.
 * This component is responsible for displaying drawer with results.
 */
const ResultsDrawer = ({ metrics, results, loading, metricsLoading }) => {
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

  return (
    // div container
    <div>
      {/* is loading */}
      {loading ? (
        // loading
        <Spin indicator={<Icon type='loading' spin />} />
      ) : results.length > 0 || metrics.length > 0 ? (
        /* rendering results and metrics */
        <>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Resultados' key='1'>
              {results.map((
                result // div result container
              ) => (
                <div key={result.uuid}>
                  {/* rendering result */}
                  {resultsTypes[result.type](result)}
                  {/* rendering divider */}
                </div>
              ))}
            </TabPane>
            <TabPane
              tab={<MetricsTitle loading={metricsLoading} />}
              key='2'
              disabled={metrics.length <= 0}
            >
              <Table bordered dataSource={dataSource} columns={columns} />
            </TabPane>
          </Tabs>
          <Divider />
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
  /** results drawer results list */
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** metrics drawer results list */
  metrics: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  metricsLoading: PropTypes.bool.isRequired,
};

// EXPORT
export default ResultsDrawer;
