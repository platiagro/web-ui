import './style.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Layout, Icon, Input, Collapse, Empty } from 'antd';
import _ from 'lodash';
import LeftSideMenuItem from '../LeftSideMenuItem';
import LeftSideMenuTemplateItem from '../LeftSideMenuTemplateItem';
import { getPipelines } from '../../../store/actions/projectActions';
import { updateExperiment } from '../../../store/actions/experimentActions';
import items from './items';

const { Sider } = Layout;
const { Panel } = Collapse;

const LeftSideMenu = (props) => {
  const { experimentsList, onGetPipelines, onUpdateExperiment } = props;
  const [menuItems, setItems] = useState(items);
  const params = useParams();

  useEffect(() => {
    onGetPipelines(items);
  }, []);

  const handleClick = (template) => {
    const { pipelineIdTrain, pipelineIdDeploy, databaseName } = template;
    const body = {
      pipelineIdTrain,
      pipelineIdDeploy,
      template: databaseName,
    };
    onUpdateExperiment(params.projectId, params.experimentId, body);
  };

  // Block change template after deploy or succeeded
  const getRunStatus = () => {
    return (
      _.find(experimentsList, { uuid: params.experimentId }).runStatus ===
        'Deployed' ||
      _.find(experimentsList, { uuid: params.experimentId }).runStatus ===
        'Succeeded'
    );
  };

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
          onChange={handleFilter}
          prefix={<Icon type='search' />}
        />
      </div>
      <Collapse bordered={false} defaultActiveKey={['1']}>
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
              <LeftSideMenuTemplateItem
                disabled={!params.experimentId || getRunStatus()}
                key={template.name}
                template={template}
                handleClick={handleClick}
              />
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
              <LeftSideMenuItem key={title} title={title} disabled />
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
              <LeftSideMenuItem key={title} title={title} disabled />
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
              <LeftSideMenuItem key={title} title={title} disabled />
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

const mapStateToProps = (state) => {
  return {
    experimentsList: state.project.experimentsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPipelines: (templateItems) => {
      dispatch(getPipelines(templateItems));
    },
    onUpdateExperiment: (projectId, experimentId, body) => {
      dispatch(updateExperiment(projectId, experimentId, body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSideMenu);
