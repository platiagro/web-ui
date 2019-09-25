import React from 'react';
import './style.scss';
import { Layout, Icon, Input, Collapse, Button } from 'antd';

const { Sider } = Layout;
// const { SubMenu } = Menu;
const { Panel } = Collapse;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const LeftSideMenu = () => (
  <Sider
    width={250}
    style={{ background: '#fff', height: 400, overflowY: 'auto', padding: 20 }}
  >
    <Input.Search
      style={{ position: 'sticky', top: 0 }}
      placeholder='Pesquisar'
      onSearch={(value) => console.log('PESQUISADO', value)}
    />
    <Collapse bordered={false}>
      <Panel
        header={
          <>
            <Icon className='icon-collapse-header' type='file' />
            <span>Template</span>
          </>
        }
        key='1'
        style={customPanelStyle}
      >
        <Button>Template ForAgri</Button>
      </Panel>
      <Panel
        header={
          <>
            <Icon className='icon-collapse-header' type='database' />
            <span>Dados de entrada</span>
          </>
        }
        key='2'
        style={customPanelStyle}
      >
        <Button disabled>Upload</Button>
      </Panel>
      <Panel
        header={
          <span>
            <Icon className='icon-collapse-header' type='control' />
            Eng. de atributos
          </span>
        }
        key='3'
        style={customPanelStyle}
      >
        <p>c</p>
      </Panel>
      <Panel
        header={
          <>
            <Icon className='icon-collapse-header' type='share-alt' />
            <span>Treinamento</span>
          </>
        }
        key='4'
        style={customPanelStyle}
      >
        <p>c</p>
      </Panel>
    </Collapse>
  </Sider>
);

export default LeftSideMenu;
