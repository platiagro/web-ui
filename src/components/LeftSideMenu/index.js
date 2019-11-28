import React, { useState, useEffect } from 'react';
import PropType from 'prop-types';
import _ from 'lodash';
import './style.scss';
import { Layout, Icon, Input, Collapse, Empty, message } from 'antd';
import { useParams } from 'react-router-dom';

import { getPipelines } from '../../services/pipelinesApi';
import {
  updateExperiment,
  createExperimentComponent,
} from '../../services/projectsApi';
import * as componentsServices from '../../services/componentsApi';

const { Sider } = Layout;
const { Panel } = Collapse;

const MockedItem = ({ title, disabled }) => (
  <div
    onClick={() => console.log('Cliclou no menu', title)}
    className={`collapse-menu-items${disabled ? ' disabled' : ''}`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {title}
  </div>
);

const Item = ({ item, title, handleClick, disabled = false }) => (
  <div
    onClick={() => {
      handleClick(item);
    }}
    className={`collapse-menu-items${item.disabled ? ' disabled' : ''}${
      disabled ? ' disabled' : ''
    }`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {title}
  </div>
);

const LeftSideMenu = ({ fetch, details }) => {
  const [items, setItems] = useState({
    template: [
      {
        name: 'Regressão Linear / Regressão Lógistica',
        databaseName: 'Linear Regression/Logistic Regression',
        pipelineTrainId: null,
        pipelineDeployId: null,
        disabled: false,
        default: false,
        template: 1,
      },
      {
        name: 'Auto Machine Learning',
        databaseName: 'AutoML',
        pipelineTrainId: null,
        pipelineDeployId: null,
        disabled: false,
        default: false,
        template: 2,
      },
      {
        name: 'Auto Featuring Com Regressão Linear / Regressão Lógistica',
        databaseName: 'AutoFeaturing + Linear Regression/Logistic Regression',
        pipelineTrainId: null,
        pipelineDeployId: null,
        disabled: false,
        default: false,
        template: 3,
      },
      {
        name: 'Auto Featuring Com Auto Machine Learning',
        databaseName: 'AutoFeaturing + AutoML',
        pipelineTrainId: null,
        pipelineDeployId: null,
        disabled: false,
        default: false,
        template: 4,
      },
    ],
    // data: ['Conjunto de dados'],
    // attr: [
    //   'Pré-seleção de atributos',
    //   'Seleção de atributos',
    //   'Criação de atributos por tempo',
    //   'Criação de atributos genéricas',
    //   'Filtro de atributos',
    // ],
    // train: ['AutoML', 'Regressão Logística', 'Regressão'],
  });
  const [menuItems, setMenuItems] = useState([]);
  const [addingComponent, setAddingComponent] = useState(false);

  // Similar ao componentDidMount
  useEffect(() => {
    const fetchPipelines = async () => {
      const pipelines = await getPipelines();

      if (!pipelines) message.error('Cross-Origin Request Blocked');

      items.template = items.template.map((template) => {
        const templateAux = template;

        if (pipelines) {
          templateAux.pipelineTrainId =
            pipelines[template.databaseName].trainId;
          templateAux.pipelineDeployId =
            pipelines[template.databaseName].deployId;
          if (templateAux.template === 4) templateAux.disabled = false;
        } else {
          templateAux.disabled = true;
        }

        return templateAux;
      });
    };

    async function fetchComponents() {
      const response = await componentsServices.getAllComponents();

      const auxItems = items;
      auxItems.components = response.data.payload;
      setMenuItems(auxItems);
    }

    fetchComponents();
    fetchPipelines();
  }, []);
  const params = useParams();
  const experiment = details.experimentList.find((e) => {
    return e.uuid === params.experimentId;
  });

  const handleTemplateClick = async (template) => {
    const response = await updateExperiment(
      params.projectId,
      params.experimentId,
      {
        pipelineIdTrain: template.pipelineTrainId,
        pipelineIdDeploy: template.pipelineDeployId,
        template: template.databaseName,
      }
    );

    if (response) {
      await fetch();
    }
  };

  const handleComponentClick = async (component) => {
    if (!addingComponent) {
      setAddingComponent(true);
      const removePipelineId = updateExperiment(
        params.projectId,
        params.experimentId,
        {
          pipelineIdTrain: null,
          pipelineIdDeploy: null,
          template: null,
        }
      );

      const addComponents = createExperimentComponent(
        params.projectId,
        params.experimentId,
        component.uuid,
        experiment.componentsList.length
      );

      await Promise.all([removePipelineId, addComponents]);
      await fetch();
      setAddingComponent(false);
    }
  };

  // Block change template after deploy or succeeded
  const getRunStatus = () => {
    return (
      _.find(details.experimentList, { uuid: params.experimentId })
        .runStatus === 'Deployed' ||
      _.find(details.experimentList, { uuid: params.experimentId })
        .runStatus === 'Succeeded'
    );
  };

  const handleFilter = (e) => {
    // console.log(e.currentTarget.value);
    const v = e.currentTarget.value;
    if (!v) {
      setMenuItems(items);
    } else {
      const auxItem = {
        components: [],
        template: [],
        data: [],
        attr: [],
        train: [],
      };

      const itemsComponents = items.components.filter((item) => {
        return item.name.toLowerCase().includes(v.toLowerCase());
      });
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

      auxItem.components = itemsComponents;
      auxItem.template = template;
      auxItem.data = data;
      auxItem.attr = attr;
      auxItem.train = train;

      setMenuItems(auxItem);
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
      <Collapse bordered={false} defaultActiveKey={['1']}>
        {!_.isEmpty(menuItems.components) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='file' />
                Componentes
              </span>
            }
            key='1'
            className='collapse-menu'
          >
            {menuItems.components.map((component) => (
              <Item
                disabled={!params.experimentId || getRunStatus()}
                item={component}
                title={component.name}
                key={component.name}
                handleClick={handleComponentClick}
              />
            ))}
          </Panel>
        )}
        {!_.isEmpty(menuItems.template) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='file' />
                Template
              </span>
            }
            key='2'
            className='collapse-menu'
          >
            {menuItems.template.map((template) => (
              <Item
                disabled={!params.experimentId || getRunStatus()}
                item={template}
                title={template.name}
                key={template.name}
                handleClick={handleTemplateClick}
              />
            ))}
          </Panel>
        )}
        {/* {!_.isEmpty(menuItems.data) && (
          <Panel
            header={
              <span>
                <Icon className='icon-collapse-header' type='database' />
                Dados de entrada
              </span>
            }
            key='3'
            className='collapse-menu'
          >
            {menuItems.data.map((title) => (
              <MockedItem key={title} title={title} disabled />
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
            key='4'
            className='collapse-menu'
          >
            {menuItems.attr.map((title) => (
              <MockedItem key={title} title={title} disabled />
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
            key='5'
            className='collapse-menu'
          >
            {menuItems.train.map((title) => (
              <MockedItem key={title} title={title} disabled />
            ))}
          </Panel>
        )} */}
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
