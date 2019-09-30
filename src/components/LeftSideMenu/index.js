import React from 'react';
import './style.scss';
import { Layout, Icon, Input, Collapse, Button } from 'antd';

const { Sider } = Layout;
const { Panel } = Collapse;

const LeftSideMenu = () => (
  <Sider width={250} className='left-side-menu'>
    <div className='collapse-menu-search-bar'>
      <Input.Search
        placeholder='Pesquisar'
        allowClear
        // eslint-disable-next-line no-console
        onSearch={(value) => console.log('PESQUISADO', value)}
      />
    </div>
    <Collapse bordered={false}>
      <Panel
        header={
          <span>
            <Icon className='icon-collapse-header' type='file' />
            Template
          </span>
        }
        key='1'
        className='collapse-menu-items'
      >
        <Button>Template ForAgri</Button>
      </Panel>
      <Panel
        header={
          <span>
            <Icon className='icon-collapse-header' type='database' />
            Dados de entrada
          </span>
        }
        key='2'
        className='collapse-menu-items'
      >
        <p>Upload</p>
      </Panel>
      <Panel
        header={
          <span>
            <Icon className='icon-collapse-header' type='control' />
            Eng. de atributos
          </span>
        }
        key='3'
        className='collapse-menu-items'
      >
        <p>Pré-seleção</p>
        <p>Seleção</p>
        <p>Criação de Variáveis por tempo</p>
        <p>Criação de Variáveis genéricas</p>
        <p>Filtro de atributos</p>
      </Panel>
      <Panel
        header={
          <span>
            <Icon className='icon-collapse-header' type='share-alt' />
            Treinamento
          </span>
        }
        key='4'
        className='collapse-menu-items'
      >
        <p>AutoML</p>
        <p>Regressão Logística</p>
        <p>Regressão</p>
      </Panel>
    </Collapse>
  </Sider>
);

export default LeftSideMenu;
