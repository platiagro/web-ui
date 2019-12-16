import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

import {
  setActiveKey,
  addExperiment,
} from '../../store/actions/experimentsTabsActions';

import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';

const { TabPane } = Tabs;
const ExperimentsTabs = (props) => {
  const { activeKey } = props;
  const {
    fetch,
    details,
    flowDetails,
    setFlowDetails,
    onSetActiveKey,
    onAddExperiment,
  } = props;
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    onSetActiveKey(
      details.experimentList.length > 0 ? params.experimentId : null
    );
    return () => onSetActiveKey(null);
  }, []);

  useEffect(() => {
    fetch(details.uuid);
  }, [activeKey]);

  useEffect(() => {
    if (activeKey) {
      history.push(`/projects/${params.projectId}/${activeKey}`);
    }
  }, [details]);

  const onChange = async (key) => {
    if (key !== 'add_tab') {
      await fetch(details.uuid);
      history.push(`/projects/${params.projectId}/${key}`);
      onSetActiveKey(key);
    }
  };

  const handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) {
      const index = details.experimentList.length + 1;
      const newTabName = `${details.name}_${index}`;
      onAddExperiment(details.uuid, newTabName, history);
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
              setFlowDetails={setFlowDetails}
              projectName={details.name}
            />
          </TabPane>
        ))}
      </DraggableTabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeKey: state.experimentsTabs.activeKey,
  };
};

const dispatchToProps = (dispatch) => ({
  onSetActiveKey: (key) => dispatch(setActiveKey(key)),
  onAddExperiment: (projectId, experimentId, name, history) =>
    dispatch(addExperiment(projectId, experimentId, name, history)),
});

export default connect(mapStateToProps, dispatchToProps)(ExperimentsTabs);
