// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer, Tabs, Table, ConfigProvider } from 'antd';

const { TabPane } = Tabs;

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ title, isVisible, logs, handleClose }) => {
  // HOOKS
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
    // ant design drawer container
    <AntDrawer
      width={'65vw'}
      title={title}
      visible={isVisible}
      closable
      onClose={handleClose}
      destroyOnClose
    >
      <span>Container</span>
      <Tabs>
        {logs.map((container, i) => (
          <TabPane tab={container.containerName} key={i}>
            <ConfigProvider renderEmpty={renderEmpty}>
              <Table
                bordered={true}
                columns={logsTableColumns}
                dataSource={container.logs}
                size='small'
                rowKey={(record) => `${record.level}-${record.timestamp}`}
              />
            </ConfigProvider>
          </TabPane>
        ))}
      </Tabs>
    </AntDrawer>
  );
};

// PROP TYPES
Drawer.propTypes = {
  /** drawer title string */
  title: PropTypes.string.isRequired,
  /** log string */
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** drawer is visible */
  isVisible: PropTypes.bool.isRequired,
  /** select input change handler */
  handleClose: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
Drawer.defaultProps = {
  /** drawer results list */
  results: undefined,
};

// EXPORT
export default Drawer;
