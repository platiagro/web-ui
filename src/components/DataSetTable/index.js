import React from 'react';

import { Table, Select, Tooltip } from 'antd';

import './style.scss';

const { Option } = Select;

const setRowKey = (record) => record.uuid;

const setTargetColor = (record, targetColumnId) =>
  record.uuid === targetColumnId ? 'targetColumn' : null;

const MySelect = ({ value, ...others }) => {
  let fixedVal = value;
  const numRegex = /num/i;
  const dateRegex = /dat/i;
  const factorRegex = /fact|cate/i;
  if (value.match(numRegex)) {
    fixedVal = 'Numerical';
  } else if (value.match(dateRegex)) {
    fixedVal = 'Date';
  } else if (value.match(factorRegex)) {
    fixedVal = 'Categorical';
  }
  return (
    <Select value={fixedVal} {...others}>
      <Option value='Date'>Data/Hora</Option>
      <Option value='Numerical'>Numérico</Option>
      <Option value='Categorical'>Categórico</Option>
    </Select>
  );
};

const DataSetTable = ({ dataSource, targetColumnId, handleSelect }) => {
  const columns = [
    {
      title: 'Atributo',
      dataIndex: 'name',
      key: 'name',
      render: (value, row, index) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Tipo de dado',
      dataIndex: 'datatype',
      key: 'datatype',
      render: (value, row, index) => (
        <MySelect
          value={value}
          onChange={(e) => {
            handleSelect(e, row);
          }}
        />
      ),
    },
  ];
  return (
    <Table
      className='dataSetTable'
      dataSource={dataSource}
      columns={columns}
      rowKey={setRowKey}
      rowClassName={(record) => setTargetColor(record, targetColumnId)}
      size='middle'
      scroll={{ y: 340 }}
    />
  );
};

export default DataSetTable;
