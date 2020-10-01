// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ConfigProvider, Drawer as AntDrawer, Tabs } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import { Skeleton } from 'uiComponents';

const { TabPane } = Tabs;

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ handleClose, isLoading, isVisible, logs, title }) => {
  // EMPTY COMPONENT
  const renderEmpty = () => <span>Não há dados.</span>;

  // COLUMNS OF LOG TABLE
  const logsTableColumns = [
    {
      title: 'Data',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 175,
      render: (value) => {
        //The value of timestamp is missformated, so we need to split the string to get the right timestamp
        const formattedDate = value
          ? //then transform into date string
            new Date(value.split(' ')[0]).toLocaleString()
          : '-';
        return formattedDate;
      },
      //this is the arrow function to make header sorter of date column
      sorter: (a, b) =>
        new Date(a.timestamp.split(' ')[0]) -
        new Date(b.timestamp.split(' ')[0]),
    },
    {
      title: 'Nível',
      dataIndex: 'level',
      key: 'level',
      width: 75,
    },
    {
      title: 'Mensagem',
      dataIndex: 'message',
      key: 'message',
      render: (value) => (
        <span style={{ fontFamily: 'Monospace' }}>{value}</span>
      ),
    },
  ];

  // RENDER
  return (
    <AntDrawer
      width={'65vw'}
      title={<strong>{title}</strong>}
      visible={isVisible}
      closable
      onClose={handleClose}
      destroyOnClose
    >
      {isLoading ? (
        <>
          <Skeleton paragraphConfig={{ rows: 1, width: '30%' }} />
          <Skeleton paragraphConfig={{ rows: 1, width: '30%' }} />
          <CommonTable
            bordered={true}
            columns={logsTableColumns}
            isLoading={true}
            size={'small'}
          />
        </>
      ) : (
        <>
          <div>
            <span style={{ fontSize: '12px' }}>CONTAINERS EM EXECUÇÃO: </span>
            <span style={{ color: '#262626', fontSize: '14px' }}>
              {logs.length}
            </span>
          </div>
          <Tabs>
            {logs.map((container, i) => (
              <TabPane tab={container.containerName} key={i}>
                <ConfigProvider renderEmpty={renderEmpty}>
                  <CommonTable
                    bordered={true}
                    columns={logsTableColumns}
                    dataSource={container.logs}
                    isLoading={false}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ['10', '20', '30', '40', '50'],
                    }}
                    rowKey={(record) => `${record.level}-${record.timestamp}`}
                    size={'small'}
                  />
                </ConfigProvider>
              </TabPane>
            ))}
          </Tabs>
        </>
      )}
    </AntDrawer>
  );
};

// PROP TYPES
Drawer.propTypes = {
  /** select input change handler */
  handleClose: PropTypes.func.isRequired,
  /** drawer is loading */
  isLoading: PropTypes.bool.isRequired,
  /** drawer is visible */
  isVisible: PropTypes.bool.isRequired,
  /** log string */
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** drawer title string */
  title: PropTypes.string.isRequired,
};

// EXPORT
export default Drawer;
