import React, { useState } from 'react';
import _ from 'lodash';
import './style.scss';
import { Layout, Icon, Input, Collapse, Empty } from 'antd';
const { Sider } = Layout;
const { Panel } = Collapse;

const Item = ({ title, disabled }) => (
  <div
    onClick={() => console.log('Cliclou no menu', title)}
    className={`collapse-menu-items${disabled ? ' disabled' : ''}`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {title}
  </div>
);

const items = {
  template: ['AutoML 1', 'AutoML 2', 'Regressão 1', 'Regressão 2'],
  data: ['Conjunto de dados'],
  attr: [
    'Pré-seleção de atributos',
    'Seleção de atributos',
    'Criação de atributos por tempo',
    'Criação de atributos genéricas',
    'Filtro de atributos',
  ],
  train: ['AutoML', 'Regressão Logística', 'Regressão'],
};

const LeftSideMenu = () => {
  const [menuItems, setItems] = useState(items);
  let handleFilter = (e) => {
    // console.log(e.currentTarget.value);
    let v = e.currentTarget.value;
    if (!v) {
      setItems(items);
    } else {
      let auxItem = { template: [], data: [], attr: [], train: [] };

      const template = items['template'].filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      const data = items['data'].filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      const attr = items['attr'].filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      const train = items['train'].filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      auxItem.template = template;
      auxItem.data = data;
      auxItem.attr = attr;
      auxItem.train = train;

      setItems(auxItem);
    }
  };

  return (
    <Sider width={250} className='left-side-menu'>
      <div className='collapse-menu-search-bar'>
        <Input
          placeholder='Pesquisar'
          allowClear
          // eslint-disable-next-line no-console
          onChange={handleFilter}
          prefix={<Icon type='search' />}
        />
      </div>
      <Collapse bordered={false}>
        {!_.isEmpty(menuItems['template']) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='file' />
                Template
              </span>
            }
            key='1'
            className='collapse-menu'
          >
            {menuItems['template'].map((title) => (
              <Item key={title} title={title} />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems['data']) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='database' />
                Dados de entrada
              </span>
            }
            key='2'
            className='collapse-menu'
          >
            {menuItems['data'].map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems['attr']) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='control' />
                Eng. de atributos
              </span>
            }
            key='3'
            className='collapse-menu'
          >
            {menuItems['attr'].map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems['train']) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='share-alt' />
                Treinamento
              </span>
            }
            key='4'
            className='collapse-menu'
          >
            {menuItems['train'].map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {_.every(menuItems, function(property) {
          return _.isEmpty(property);
        }) && (
          <div>
            <Empty description={'Vazio'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </Collapse>
    </Sider>
  );
};

export default LeftSideMenu;
