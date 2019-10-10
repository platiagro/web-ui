import React from 'react';

import { Table, Select } from 'antd';

import './style.scss';

const { Option } = Select;

const setRowKey = (record) => record.uuid;

const setTargetColor = (record, targetColumnId) =>
  record.uuid === targetColumnId ? 'targetColumn' : null;

const MySelect = ({ value }) => (
  <Select defaultValue={value}>
    <Option value='DateTime'>Data/Hora</Option>
    <Option value='Numerical'>Numérico</Option>
    <Option value='Categorical'>Categórico</Option>
  </Select>
);

// const dataSource = [
//   {
//     key: '1',
//     attribute: 'id',
//     dataType: 'numeric',
//   },
//   {
//     key: '2',
//     attribute: 'hora',
//     dataType: 'dateHour',
//   },
//   {
//     key: '3',
//     attribute: 'tipo',
//     dataType: 'categoric',
//   },
// ];

const columns = [
  {
    title: 'Atributo',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tipo de dado',
    dataIndex: 'datatype',
    key: 'datatype',
    render: (value, row, index) => <MySelect value={value} />,
  },
];

const DataSetTable = ({ dataSource, targetColumnId }) => (
  <Table
    className='dataSetTable'
    dataSource={dataSource}
    columns={columns}
    rowKey={setRowKey}
    rowClassName={(record) => setTargetColor(record, targetColumnId)}
  />
);

export default DataSetTable;
