import React from 'react';

import { Table, Select } from 'antd';

const { Option } = Select;

const MySelect = ({ value }) => (
  <Select defaultValue={value}>
    <Option value='dateHour'>Data/Hora</Option>
    <Option value='numeric'>Numérico</Option>
    <Option value='categoric'>Categórico</Option>
  </Select>
);

const dataSource = [
  {
    key: '1',
    attribute: 'id',
    dataType: 'numeric',
  },
  {
    key: '2',
    attribute: 'hora',
    dataType: 'dateHour',
  },
  {
    key: '3',
    attribute: 'tipo',
    dataType: 'categoric',
  },
];

const columns = [
  {
    title: 'Atributo',
    dataIndex: 'attribute',
    key: 'attribute',
  },
  {
    title: 'Tipo de dado',
    dataIndex: 'dataType',
    key: 'dataType',
    render: (value, row, index) => <MySelect value={value} />,
  },
];

const DataSetTable = () => <Table dataSource={dataSource} columns={columns} />;

export default DataSetTable;
