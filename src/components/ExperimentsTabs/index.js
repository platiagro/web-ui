import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';

import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';
import * as projectsServices from '../../services/projectsApi';

const { TabPane } = Tabs;
const ExperimentsTabs = ({ fetch, details, flowDetails }) => {
  const [activeKey, setActiveKey] = useState(null);
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    setActiveKey(
      details.experimentList.length > 0 ? params.experimentId : null
    );
  }, []);

  const onChange = async (key) => {
    if (key !== 'add_tab') {
      await fetch(details.uuid);
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
      history.push(
        `/projects/${params.projectId}/${response.data.payload.uuid}`
      );

      setActiveKey(response.data.payload.uuid);
    }
  };

  const handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) {
      add();
    }
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
              details={details.experimentList[index]}
              flowDetails={flowDetails}
              fetch={fetch}
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
};

export default ExperimentsTabs;
