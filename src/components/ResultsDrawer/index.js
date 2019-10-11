import React from 'react';

import { Tag, Icon, Divider, Table } from 'antd';

const columnsResult = [
  {
    title: 'Fruta',
    dataIndex: 'fruit',
  },
  {
    title: 'Preço Kg',
    dataIndex: 'priceKg',
  },
  {
    title: 'Colheita',
    dataIndex: 'harvest',
  },
  {
    title: 'Preço Médio',
    dataIndex: 'averagePrice',
  },
];

const dataResult = [
  {
    key: '1',
    fruit: 'banana',
    priceKg: '4,00',
    harvest: '01/01/2019',
    averagePrice: '4,00',
  },
  {
    key: '2',
    fruit: 'banana',
    priceKg: '5,00',
    harvest: '02/01/2019',
    averagePrice: '5,00',
  },
  {
    key: '3',
    fruit: 'banana',
    priceKg: '6,00',
    harvest: '03/01/2019',
    averagePrice: '6,00',
  },
  {
    key: '4',
    fruit: 'banana',
    priceKg: '7,00',
    harvest: '04/01/2019',
    averagePrice: '7,00',
  },
  {
    key: '5',
    fruit: 'banana',
    priceKg: '8,00',
    harvest: '05/01/2019',
    averagePrice: '8,00',
  },
];

const ResultsDrawer = () => (
  <div>
    <p>Atributos agrupados: </p>
    <Tag>neighbourhood_group</Tag>
    <Tag>room_type</Tag>

    <br />
    <br />

    <p>Período de agrupamento: </p>
    <Tag>Diário</Tag>

    <Divider />

    <p>
      <strong>Atributos resultantes</strong>
    </p>
    <span>15 </span>
    <Icon type='arrow-right' />
    <span> 45 </span>
    <Icon type='arrow-up' />
    <span>Mais 30 atributos (+ 200%)</span>

    <br />
    <br />

    <p>
      <small>Exibindo N de 1.234 observações</small>
    </p>
    <Table
      dataSource={dataResult}
      columns={columnsResult}
      size='middle'
      pagination={false}
      // scroll={{ y: 340 }}
    />
  </div>
);

export default ResultsDrawer;
