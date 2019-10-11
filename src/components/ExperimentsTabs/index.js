import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';

import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';
import * as projectsServices from '../../services/projectsApi';

const { TabPane } = Tabs;
const ExperimentsTabs = ({ details, params, fetch, flowDetails }) => {
  const [activeKey, setActiveKey] = useState(null);
  const history = useHistory();
  useEffect(() => {
    setActiveKey(
      details.experimentList.length > 0 ? params.experimentId : null
    );
  }, []);

  const onChange = (key) => {
    if (key !== 'add_tab') {
      history.push(`/projects/${params.projectId}/${key}`);
      setActiveKey(key);
    }
  };
  const add = async () => {
    const index = details.experimentList.length + 1;
    const newTabName = `${details.name}_${index}`;
    const response = await projectsServices.createExperiment(
      details.uuid,
      newTabName
    );
    if (response) {
      await fetch(details.uuid);
      setActiveKey(response.data.payload.uuid);
    }
  };

  const handleClick = (tabkey, event) => {
    console.log(tabkey);
    if (tabkey === 'add_tab' && !!event) add();
  };

  return (
    <div className='tab-container'>
      <DraggableTabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type='editable-card'
        onTabClick={handleClick}
      >
        {details.experimentList.map((pane, index) => (
          <TabPane tab={pane.name} closable={false} key={pane.uuid}>
            <ExperimentContent
              fetch={fetch}
              details={details.experimentList[index]}
              flowDetails={flowDetails}
            />
          </TabPane>
        ))}
      </DraggableTabs>
    </div>
  );
};
ExperimentsTabs.propTypes = {
  details: PropTypes.shape({
    experimentList: PropTypes.array,
    name: PropTypes.string,
    uuid: PropTypes.string,
  }).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  fetch: PropTypes.func.isRequired,
};

export default ExperimentsTabs;
