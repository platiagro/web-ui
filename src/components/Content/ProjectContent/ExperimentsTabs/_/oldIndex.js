import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'antd/dist/antd.css';
import './style.scss';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import DraggableTabs from '../DraggableTabs';
import ExperimentContent from '../ExperimentContent';
import { addExperiment } from '../../store/actions/projectActions';
import { getExperiment } from '../../store/actions/experimentActions';

const { TabPane } = Tabs;

const ExperimentsTabs = (props) => {
  const { uuid, name, experimentsList, activeKey } = props;
  const { onGetExperiment, onAddExperiment } = props;

  const history = useHistory();
  const params = useParams();

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
      onGetExperiment(params.project, key);
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
        {experimentsList.map((pane) => (
          <TabPane tab={pane.name} closable={false} key={pane.uuid}>
            <ExperimentContent />
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
    activeKey: state.experiment.uuid,
  };
};

/**
 * Dispathing actions to the Store
 * @param {Object} dispatch References component actions
 */
const dispatchToProps = (dispatch) => ({
  onGetExperiment: (projectId, experimentId) => {
    dispatch(getExperiment(projectId, experimentId));
  },
  onAddExperiment: (projectId, experimentId, name, history) =>
    dispatch(addExperiment(projectId, experimentId, name, history)),
});

export default connect(
  mapStateToProps,
  dispatchToProps
)(ExperimentsTabs);
