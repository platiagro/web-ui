import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';
import {
  setActiveKey,
  addExperiment,
} from '../../store/actions/projectActions';

const { TabPane } = Tabs;

const ExperimentsTabs = (props) => {
  const { uuid, name, experimentsList, activeKey } = props;
  const { fetch, onSetActiveKey, onAddExperiment } = props;
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    onSetActiveKey(experimentsList.length > 0 ? params.experimentId : null);
    return () => onSetActiveKey(null);
  }, []);

  useEffect(() => {
    if (activeKey) {
      history.push(`/projects/${params.projectId}/${activeKey}`);
    }
  }, [experimentsList]);

  /**
   * Handle tabs swapping
   * @param {String} key
   */
  const onChange = async (key) => {
    if (key !== 'add_tab') {
      history.push(`/projects/${params.projectId}/${key}`);
      onSetActiveKey(key);
    }
  };

  /**
   * Deals with creating a new project experiment
   * @param {String} tabkey Tab key from antd component
   * @param {Object} event
   */
  const handleClick = (tabkey, event) => {
    if (tabkey === 'add_tab' && !!event) {
      const index = experimentsList.length + 1;
      const newTabName = `${name}_${index}`;
      onAddExperiment(uuid, newTabName, history);
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
        {experimentsList.map((pane, index) => (
          <TabPane tab={pane.name} closable={false} key={pane.uuid}>
            <ExperimentContent
              details={experimentsList[index]}
              fetch={fetch}
              projectName={name}
            />
          </TabPane>
        ))}
      </DraggableTabs>
    </div>
  );
};

/**
 * Selecting data (state) from Store and connecting co component needs
 * @param {Object} state
 */
const mapStateToProps = (state) => {
  return {
    ...state.project,
  };
};

/**
 * Dispathing actions to the Store
 * @param {Object} dispatch References component actions
 */
const dispatchToProps = (dispatch) => ({
  onSetActiveKey: (key) => dispatch(setActiveKey(key)),
  onAddExperiment: (projectId, experimentId, name, history) =>
    dispatch(addExperiment(projectId, experimentId, name, history)),
});

export default connect(
  mapStateToProps,
  dispatchToProps
)(ExperimentsTabs);
