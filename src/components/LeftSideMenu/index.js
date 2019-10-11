import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import _ from 'lodash';
import './style.scss';
import { Layout, Icon, Input, Collapse, Empty } from 'antd';

import { getPipelines } from '../../services/pipelinesApi';

const { Sider } = Layout;
const { Panel } = Collapse;

const items = {
  template: [
    {
      name: 'Regressão Linear / Regressão Lógistica',
      databaseName: 'Linear Regression/Logistic Regression',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: true,
      default: false,
    },
    {
      name: 'Auto Machine Learning',
      databaseName: 'AutoML',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: true,
      default: false,
    },
    {
      name: 'Auto Featuring Com Regressão Linear / Regressão Lógistica',
      databaseName: 'AutoFeaturing + Linear Regression/Logistic Regression',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: true,
      default: false,
    },
    {
      name: 'Auto Featuring Com Auto Machine Learning',
      databaseName: 'AutoFeaturing + AutoML',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: false,
      default: true,
    },
  ],
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

const fetchPipelines = async (setFlowDetails) => {
  let pipelines;
  pipelines = await getPipelines();

  items.template = items.template.map((template) => {
    const templateAux = template;

    templateAux.pipelineTrainId = pipelines[template.databaseName].trainId;
    templateAux.pipelineDeployId = pipelines[template.databaseName].deployId;

    if (template.default) setFlowDetails(template);

    return templateAux;
  });
};

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

const TemplateItem = ({ template }) => (
  <div
    onClick={() =>
      console.log(
        'Cliclou no menu',
        template.name,
        template.pipelineDeployId,
        template.pipelineTrainId
      )}
    className={`collapse-menu-items${template.disabled ? ' disabled' : ''}`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {template.name}
  </div>
);

const LeftSideMenu = ({ setFlowDetails }) => {
  // Similar ao componentDidMount
  useEffect(() => {
    fetchPipelines(setFlowDetails);
  }, []);

  const [menuItems, setItems] = useState(items);
  const handleFilter = (e) => {
    // console.log(e.currentTarget.value);
    const v = e.currentTarget.value;
    if (!v) {
      setItems(items);
    } else {
      const auxItem = { template: [], data: [], attr: [], train: [] };

      const template = items.template.filter((item) => {
        return item.name.toLowerCase().includes(v.toLowerCase());
      });
      const data = items.data.filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      const attr = items.attr.filter((item) => {
        return item.toLowerCase().includes(v.toLowerCase());
      });
      const train = items.train.filter((item) => {
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
        {!_.isEmpty(menuItems.template) && (
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
            {menuItems.template.map((template) => (
              <TemplateItem key={template.name} template={template} />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems.data) && (
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
            {menuItems.data.map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems.attr) && (
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
            {menuItems.attr.map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems.train) && (
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
            {menuItems.train.map((title) => (
              <Item key={title} title={title} disabled />
            ))}
          </Panel>
        )}
        {_.every(menuItems, (property) => {
          return _.isEmpty(property);
        }) && (
          <div>
            <Empty description='Vazio' image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </Collapse>
    </Sider>
  );
};
Item.defaultProps = {
  disabled: false,
};
Item.propTypes = {
  disabled: PropType.bool,
  title: PropType.string.isRequired,
};
export default LeftSideMenu;
